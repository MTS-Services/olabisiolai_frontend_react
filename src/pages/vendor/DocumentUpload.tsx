import Header from "@/components/sections/vendor/document/Header";
import File from "@/components/sections/vendor/document/File";
import VerifyIdentity from "@/components/sections/vendor/document/VerifyIdentity";


export default function DocumentUpload() {
  return (
    <div className="p-4 md:p-6">
      <Header />
      <File />
      <VerifyIdentity />
    </div>
  );
}
