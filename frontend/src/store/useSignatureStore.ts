// https://www.npmjs.com/package/zustand
import { cloneDeep } from "lodash";
import { create } from "zustand";

// }));
export interface FileSignature {
  fileName: string;
  fileHash: string;
  fileSizeBytes: number;
  signer: string;
  date: number;
}

export interface SignatureStore {
  fileSignature: FileSignature;
  set: (fileSignature: FileSignature) => void;
  destroy: () => void;
}

const useZustand = create<SignatureStore>((set, get) => ({
  fileSignature: {
    fileName: "",
    fileHash: "",
    fileSizeBytes: 0,
    signer: "",
    date: 0,
  },
  set: (fileSignature: FileSignature) => set((state) => ({ fileSignature })),
  destroy: () => {
    set(() => ({
      fileSignature: {
        fileName: "",
        fileHash: "",
        fileSizeBytes: 0,
        signer: "",
        date: 0,
      },
    }));
  },
}));

export const useSignatureStore = (): SignatureStore => {
  const signatureStore = useZustand((state) => state);

  if (process.env.NODE_ENV !== "production") {
    Object.assign(window as any, {
      signatureStore,
    });
  }

  return signatureStore;
};
