import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { NewConversationModal } from "@/features/messaging/NewConversationModal";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { showError } from "@/lib/sweetAlert";

import { getConversations } from "@/api/conversations";
import { useAuth } from "@/auth/useAuth";
import type { MessagingUser } from "@/types/user";
import { useMessagingRealtime } from "@/hooks/useMessagingRealtime";
import { useInfiniteMessages } from "@/hooks/useInfiniteMessages";
import { useMessageActions } from "@/hooks/useMessageActions";
import { useTypingIndicator } from "@/hooks/useTypingIndicator";
import type { Conversation } from "@/types/conversation";
import { DirectLeadsTable } from "@/components/sections/vendor/leads/DirectLeadsTable";
import { LeadDetailsModal } from "@/components/sections/vendor/leads/LeadDetailsModal";
import { LeadsTabs } from "@/components/sections/vendor/leads/LeadsChannelTabs";
import { LeadsHeader } from "@/components/sections/vendor/leads/LeadsHeader";
import { WhatsAppLeadsList } from "@/components/sections/vendor/leads/WhatsAppLeadsList";
import { WhatsAppChatInterface } from "@/components/sections/vendor/leads/WhatsAppChatView";
import { type Lead, type LeadChannel } from "@/components/sections/vendor/leads/leadsData";
import { flattenMessagesChronological } from "@/utils/flattenMessages";
import { conversationToLead, messageToChatMessage } from "@/utils/vendorLeads";

export default function VendorLeads() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuth();
  const selfId = Number(user?.id ?? 0);
  const me = useMemo((): MessagingUser | null => {
    if (!user) return null;
    return {
      id: Number(user.id),
      name: user.name ?? "You",
      avatar: null,
      status: "online",
      last_seen_at: null,
    };
  }, [user]);

  const [channelFilter, setChannelFilter] = useState<LeadChannel>("whatsapp");
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [openLeadDetails, setOpenLeadDetails] = useState<Lead | null>(null);
  const [chatSearch, setChatSearch] = useState("");
  const [messageDraft, setMessageDraft] = useState("");
  const [newConversationOpen, setNewConversationOpen] = useState(false);

  const conversationsQuery = useQuery({
    queryKey: ["vendor-conversations"],
    queryFn: async () => {
      const { conversations } = await getConversations({ type: "direct", page: 1 });
      return conversations;
    },
    enabled: isAuthenticated && selfId > 0,
  });

  const chatLeads = useMemo(() => {
    const list = conversationsQuery.data ?? [];
    return list.map((c) => conversationToLead(c, selfId, "whatsapp"));
  }, [conversationsQuery.data, selfId]);

  const tableLeads = useMemo(() => {
    const list = conversationsQuery.data ?? [];
    return list.map((c) => conversationToLead(c, selfId, "direct"));
  }, [conversationsQuery.data, selfId]);

  const filteredLeads = useMemo(() => {
    const base = channelFilter === "whatsapp" ? chatLeads : tableLeads;
    if (channelFilter !== "whatsapp") return base;
    const q = chatSearch.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (l) => l.name.toLowerCase().includes(q) || l.message.toLowerCase().includes(q),
    );
  }, [channelFilter, chatLeads, tableLeads, chatSearch]);

  const directCount = tableLeads.length;
  const whatsappCount = chatLeads.length;

  useEffect(() => {
    if (conversationsQuery.isError) {
      showError("Could not load conversations");
    }
  }, [conversationsQuery.isError]);

  useEffect(() => {
    const conversationUuid = searchParams.get("c")?.trim();
    if (!conversationUuid || !conversationsQuery.data?.length) return;
    const match = conversationsQuery.data.find((c) => c.uuid === conversationUuid);
    if (!match) return;
    setChannelFilter("whatsapp");
    setSelectedLeadId(match.uuid);
  }, [searchParams, conversationsQuery.data]);

  useEffect(() => {
    if (channelFilter !== "whatsapp") return;
    if (!filteredLeads.length) {
      if (selectedLeadId) setSelectedLeadId("");
      return;
    }
    if (!filteredLeads.some((l) => l.id === selectedLeadId)) {
      setSelectedLeadId(filteredLeads[0].id);
    }
  }, [channelFilter, filteredLeads, selectedLeadId]);

  const activeRealtimeConversation = useMemo((): Conversation | null => {
    if (channelFilter !== "whatsapp" || !selectedLeadId) return null;
    return conversationsQuery.data?.find((c) => c.uuid === selectedLeadId) ?? null;
  }, [channelFilter, selectedLeadId, conversationsQuery.data]);

  useMessagingRealtime(activeRealtimeConversation, selfId);

  const messagesInf = useInfiniteMessages(
    channelFilter === "whatsapp" ? selectedLeadId : null,
  );

  const { sendMessage: sendMessageAction, isSending } = useMessageActions(
    channelFilter === "whatsapp" ? selectedLeadId : null,
    me,
  );

  const { typingUsers, signalTyping } = useTypingIndicator(
    activeRealtimeConversation
      ? { uuid: activeRealtimeConversation.uuid, id: activeRealtimeConversation.id }
      : null,
    me ? { id: me.id, name: me.name } : null,
  );

  const peerTyping = useMemo(
    () => typingUsers.filter((u) => u.is_typing && u.user_id !== selfId),
    [typingUsers, selfId],
  );

  const selectedConversation = useMemo(() => {
    const pages = messagesInf.data?.pages ?? [];
    if (!pages.length) return [];
    return flattenMessagesChronological(pages).map((m) =>
      messageToChatMessage(m, selfId),
    );
  }, [messagesInf.data, selfId]);

  const lastVendorMessageIndex = useMemo(() => {
    let last = -1;
    selectedConversation.forEach((m, i) => {
      if (m.from === "vendor") last = i;
    });
    return last;
  }, [selectedConversation]);

  const selectedLead =
    filteredLeads.find((lead) => lead.id === selectedLeadId) ?? filteredLeads[0] ?? null;

  const isDirectChannel = channelFilter === "direct";

  const handleSend = async () => {
    const t = messageDraft.trim();
    if (!t || !selectedLeadId || isSending) return;
    setMessageDraft("");
    try {
      await sendMessageAction(t);
      void queryClient.invalidateQueries({ queryKey: ["vendor-conversations"] });
    } catch {
      setMessageDraft(t);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-5 md:space-y-6">
        <LeadsHeader />

        {conversationsQuery.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading your inbox…</p>
        ) : null}

        <LeadsTabs
          channelFilter={channelFilter}
          onChange={(c) => {
            setChannelFilter(c);
            if (c === "direct") setChatSearch("");
          }}
          directCount={directCount}
          whatsappCount={whatsappCount}
        />

        {isDirectChannel ? (
          <DirectLeadsTable leads={filteredLeads} onOpenLeadDetails={setOpenLeadDetails} />
        ) : (
          <div className="grid min-h-[min(640px,calc(100dvh-220px))] min-w-0 lg:grid-cols-[minmax(260px,300px)_minmax(0,1fr)]">
            <WhatsAppLeadsList
              leads={filteredLeads}
              selectedLeadId={selectedLeadId}
              onSelectLead={(id) => {
                setSelectedLeadId(id);
                setMessageDraft("");
              }}
              searchQuery={chatSearch}
              onSearchChange={setChatSearch}
              onNewConversation={() => setNewConversationOpen(true)}
            />
            <WhatsAppChatInterface
              selectedLead={selectedLead}
              selectedConversation={selectedConversation}
              lastVendorMessageIndex={lastVendorMessageIndex}
              newMessagesDividerAfterIndex={-1}
              messageDraft={messageDraft}
              onMessageDraftChange={setMessageDraft}
              onComposerTyping={signalTyping}
              onSend={handleSend}
              isSending={isSending}
              messagesLoading={messagesInf.isLoading}
              typingPeers={peerTyping}
            />
          </div>
        )}

        <LeadDetailsModal
          openLead={openLeadDetails}
          onClose={() => setOpenLeadDetails(null)}
        />

        <NewConversationModal
          open={newConversationOpen}
          onClose={() => setNewConversationOpen(false)}
          onCreated={(uuid) => {
            setChannelFilter("whatsapp");
            setSelectedLeadId(uuid);
            setMessageDraft("");
            void queryClient.invalidateQueries({ queryKey: ["vendor-conversations"] });
            void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.messages(uuid) });
          }}
        />
      </div>
    </div>
  );
}
