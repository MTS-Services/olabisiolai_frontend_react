import { UploadCloudIcon, X, FileText } from "lucide-react";
import { useState, useEffect } from "react";

export default function File() {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File[] }>({
    "Business Registration": [],
    "Identity Proof": [],
    "Address Proof": [],
  });

  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string[] }>({
    "Business Registration": [],
    "Identity Proof": [],
    "Address Proof": [],
  });

  const handleFileUpload = (title: string, files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      const newUrls = newFiles.map(file => {
        if (file.type.startsWith('image/')) {
          return URL.createObjectURL(file);
        }
        return '';
      });

      setUploadedFiles(prev => ({
        ...prev,
        [title]: [...prev[title], ...newFiles]
      }));

      setPreviewUrls(prev => ({
        ...prev,
        [title]: [...prev[title], ...newUrls]
      }));
    }
  };

  const removeFile = (title: string, index: number) => {
    // Revoke object URL to prevent memory leaks
    if (previewUrls[title][index]) {
      URL.revokeObjectURL(previewUrls[title][index]);
    }

    setUploadedFiles(prev => ({
      ...prev,
      [title]: prev[title].filter((_, i) => i !== index)
    }));

    setPreviewUrls(prev => ({
      ...prev,
      [title]: prev[title].filter((_, i) => i !== index)
    }));
  };

  // Cleanup object URLs on component unmount
  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach(urls => {
        urls.forEach(url => {
          if (url) {
            URL.revokeObjectURL(url);
          }
        });
      });
    };
  }, [previewUrls]);
 
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 ">
        {[
          {
            title: "Business Registration",
            hint: "Trade license CAC incorporation document. PDF, JPG",
          },
          {
            title: "Identity Proof",
            hint: "Government-issued ID, Passport or Driver's License",
          },
          {
            title: "Address Proof",
            hint: "Utility bill or bank statement issued within 3 months",
          },
        ].map(({ title, hint }) => (
          <div key={title}>
            <p className="text-xl font-medium text-gray-600 mb-2">{title}</p>
            <div className="border-2 border-gray-200 rounded-xl p-8 flex flex-col items-center gap-2 cursor-pointer hover:border-blue-400 bg-blue-50/40 transition-colors min-h-[150px] justify-center relative">
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileUpload(title, e.target.files)}
              />
              <UploadCloudIcon className="w-7 h-7 text-blue-500" />
              <span className="text-sm font-medium text-blue-500">
                Click to upload images
              </span>
              <span className="text-xs text-gray-400 text-center leading-snug">
                {hint}
              </span>
            </div>
            
            {uploadedFiles[title].length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {uploadedFiles[title].map((file, index) => (
                  <div key={index} className="relative group">
                    {previewUrls[title][index] ? (
                      <img
                        src={previewUrls[title][index]}
                        alt={file.name}
                        className="w-full h-20 object-cover rounded-lg border border-gray-200"
                      />
                    ) : (
                      <div className="w-full h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <button
                      onClick={() => removeFile(title, index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                      {file.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
