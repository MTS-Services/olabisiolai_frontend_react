import File from "@/components/sections/vendor/document/file";
import Header from "@/components/sections/vendor/document/header";
import VerifyIdentity from "@/components/sections/vendor/document/VerifyIdentity";


export default function DcoumentUpload() {
  return (
    <div className="p-4 md:p-6">
      <Header />
      <File />
      <VerifyIdentity />
    </div>
  );
}
