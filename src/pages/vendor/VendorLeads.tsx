import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getConversations } from "@/api/conversations";
import { getMessages, sendMessage } from "@/api/messages";
import { useAuth } from "@/auth/useAuth";
import { useMessagingRealtime } from "@/hooks/useMessagingRealtime";
import { useTypingIndicator } from "@/hooks/useTypingIndicator";
import type { Conversation } from "@/types/conversation";
import { DirectLeadsTable } from "@/components/sections/vendor/leads/DirectLeadsTable";
import { LeadDetailsModal } from "@/components/sections/vendor/leads/LeadDetailsModal";
import { LeadsTabs } from "@/components/sections/vendor/leads/LeadsChannelTabs";
import { LeadsHeader } from "@/components/sections/vendor/leads/LeadsHeader";
import { WhatsAppLeadsList } from "@/components/sections/vendor/leads/WhatsAppLeadsList";
import { WhatsAppChatInterface } from "@/components/sections/vendor/leads/WhatsAppChatView";
import { type Lead, type LeadChannel } from "@/components/sections/vendor/leads/leadsData";
import { conversationToLead, messageToChatMessage } from "@/utils/vendorLeads";

export default function VendorLeads() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const selfId = Number(user?.id ?? 0);

  const [channelFilter, setChannelFilter] = useState<LeadChannel>("whatsapp");
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [openLeadDetails, setOpenLeadDetails] = useState<Lead | null>(null);
  const [chatSearch, setChatSearch] = useState("");
  const [messageDraft, setMessageDraft] = useState("");

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
      toast.error("Could not load conversations");
    }
  }, [conversationsQuery.isError]);

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

  useMessagingRealtime(activeRealtimeConversation);

  const { typingUsers, signalTyping } = useTypingIndicator(
    activeRealtimeConversation?.uuid ?? null,
  );

  const peerTyping = useMemo(
    () => typingUsers.filter((u) => u.is_typing && u.user_id !== selfId),
    [typingUsers, selfId],
  );

  const messagesQuery = useQuery({
    queryKey: ["vendor-lead-messages", selectedLeadId],
    queryFn: async () => {
      const { messages } = await getMessages(selectedLeadId);
      return messages;
    },
    enabled: Boolean(
      channelFilter === "whatsapp" && selectedLeadId && isAuthenticated && selfId > 0,
    ),
  });

  const sendMutation = useMutation({
    mutationFn: (body: string) => sendMessage(selectedLeadId, body.trim()),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["vendor-lead-messages", selectedLeadId] });
      await queryClient.invalidateQueries({ queryKey: ["vendor-conversations"] });
      setMessageDraft("");
    },
    onError: () => {
      toast.error("Could not send message");
    },
  });

  const selectedConversation = useMemo(() => {
    if (!messagesQuery.data?.length) return [];
    const chronological = [...messagesQuery.data].reverse();
    return chronological.map((m) => messageToChatMessage(m, selfId));
  }, [messagesQuery.data, selfId]);

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

  const handleSend = () => {
    const t = messageDraft.trim();
    if (!t || !selectedLeadId || sendMutation.isPending) return;
    sendMutation.mutate(t);
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
          <div className="grid min-h-[min(640px,calc(100dvh-220px))] lg:grid-cols-[minmax(260px,300px)_1fr]">
            <WhatsAppLeadsList
              leads={filteredLeads}
              selectedLeadId={selectedLeadId}
              onSelectLead={(id) => {
                setSelectedLeadId(id);
                setMessageDraft("");
              }}
              searchQuery={chatSearch}
              onSearchChange={setChatSearch}
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
              isSending={sendMutation.isPending}
              messagesLoading={messagesQuery.isLoading}
              typingPeers={peerTyping}
            />
          </div>
        )}

        <LeadDetailsModal
          openLead={openLeadDetails}
          onClose={() => setOpenLeadDetails(null)}
        />
      </div>
    </div>
  );
}
