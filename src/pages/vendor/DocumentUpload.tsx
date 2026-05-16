import { useState } from "react";

import File from "@/components/sections/vendor/document/File";
import Header from "@/components/sections/vendor/document/Header";
import VerifyIdentity from "@/components/sections/vendor/document/VerifyIdentity";

export default function DocumentUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({
    "Business Registration": [],
    "Identity Proof": [],
    "Address Proof": [],
  });

  return (
    <div className="p-4 md:p-6">
      <Header />
      <File uploadedFiles={uploadedFiles} onFilesChange={setUploadedFiles} />
      <VerifyIdentity uploadedFiles={uploadedFiles} />
    </div>
  );
}
