'use client';

import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';
import { FileState, MultiFileDropzone } from './MultiFileDropzone';
type MultFileProps={
    fileStates:FileState[];
    setFileStates:any;
}
export function MultiFileInput({fileStates,setFileStates}:MultFileProps) {
//   const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates: any) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState: { key: string; }) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <div>
      <MultiFileDropzone
        value={fileStates}
        onChange={(files:any) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles:any) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState:FileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });
                console.log(res);
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }}
      />
    </div>
  );
}