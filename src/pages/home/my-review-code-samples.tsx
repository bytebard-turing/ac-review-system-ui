import React, { useCallback } from "react";
import ApiService from "src/data/services";
import { CodeEditReview } from "./code-viewer/code-edit-review";
import { CodeList } from "./code-viewer/code-list";
import { useParams } from "react-router-dom";

export const MyReviewCodeSamples: React.FC = () => {
  const [rows, setRows] = React.useState<any>([]);
  const [codeEditSample, setCodeEditSample] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [selectedSample, setSelectedSample] = React.useState(null);

  const params = useParams();

  React.useEffect(() => {
    setLoading(true);
    ApiService.getFiles().then((result: any) => {
      setRows(result.reviewRequestedSamples);
      const sample = params.id
        ? result.createdSamples.find((rec: any) => rec.id === params.id)
        : null;
      setSelectedSample(sample);
      setLoading(false);
    });
  }, [params.id]);

  React.useEffect(() => {
    if (selectedSample) {
      setLoading(true);
      ApiService.getCodeEditSample(selectedSample)
        .then(setCodeEditSample)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedSample]);

  const handleSampleChange = React.useCallback((e: any, v: any) => {
    setSelectedSample(v);
  }, []);

  const handleSaveCodeSampleReview = useCallback(
    ({
      reviewComment,
      reviewStatus,
    }: {
      reviewStatus: string;
      reviewComment: string;
    }) => {
      setLoading(true);
      const { id, name, reviewerData } = codeEditSample || {};
      ApiService.saveReview({
        reviewerData,
        id,
        name,
        reviewComment,
        reviewStatus,
      }).finally(() => {
        setLoading(false);
      });
    },
    [codeEditSample]
  );

  return (
    <>
      {
        <CodeList
          loading={loading}
          rows={rows}
          selectedSample={selectedSample}
          handleSampleChange={handleSampleChange}
        />
      }
      {
        <CodeEditReview
          loading={loading}
          codeEditReviewSample={codeEditSample}
          saveCodeSampleReview={handleSaveCodeSampleReview}
        />
      }
    </>
  );
};
