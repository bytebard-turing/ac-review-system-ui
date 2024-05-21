import React, { useCallback } from "react";
import ApiService from "src/data/services";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  Typography,
  Grid,
  Chip,
  Badge,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { CodeEditor } from "./code-editor";
import moment from "moment";
import { AccessTime, Pending } from "@mui/icons-material";
import omit from "lodash/omit";
import { CodeViewer } from "./code-viewer/code-edit-review";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      spacing={2}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid item xs={12} sx={{ py: 2, my: 1 }}>
          {children}
        </Grid>
      )}
    </Grid>
  );
};

const Overview: React.FC<{ history: any[] }> = ({ history }) => {
  return (
    <Timeline position="alternate">
      {history?.map((h: any, index: number) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent color="text.primary">
            {moment(h.updated).format("lll")}
            <Typography variant="body2" color="text.secondary">
              <Chip color="warning" label={h.assignedBy}></Chip>
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot variant="outlined">
              <AccessTime />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Card sx={{ maxWidth: 345, boxShadow: 3, bgcolor: "#e1e1e1" }}>
              <CardContent>
                <Badge
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                  color="secondary"
                  badgeContent={h.level}
                  overlap="circular"
                >
                  <Pending color="warning" />
                </Badge>
                <Typography variant="body2" color="InfoText">
                  {h.comment}
                </Typography>
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export const CodeEditorView: React.FC = () => {
  const [codeEditSample, setCodeEditSample] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);

  const params = useParams();

  const { reviewerData, viewerData, ...fileContent } = codeEditSample;
  const permission = reviewerData?.permission;

  React.useEffect(() => {
    if (params.id) {
      setLoading(true);
      ApiService.getCodeEditSample(params.id)
        .then(setCodeEditSample)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params.id]);

  const handleCodeChange = useCallback((v: any) => {}, []);

  const handleTabChange = useCallback(
    (evt: React.BaseSyntheticEvent, value: number) => {
      setTabValue(value);
    },
    []
  );

  const saveCodeReviewChange = useCallback(
    ({
      reviewComment,
      reviewStatus,
    }: {
      reviewStatus: string;
      reviewComment: string;
    }) => {
      setLoading(true);
      const { id, name, reviewerData, fileId } = codeEditSample || {};
      ApiService.saveReview({
        reviewerData,
        id,
        fileId,
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
    <Box sx={{ bgcolor: "#fff", width: "100%" }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable force tabs example"
      >
        <Tab label="Overview" value={0} />
        <Tab label="Viewer" value={1} />
        <Tab label="Code" value={2} />
      </Tabs>
      <CustomTabPanel value={tabValue} index={0}>
        <Grid item xs={4}>
          <Overview history={reviewerData?.history} />
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        {!!viewerData ? (
          <CodeViewer
            hideReviewSection={!permission?.canEdit || !permission?.canReview}
            codeEditReviewSample={viewerData}
            loading={loading}
            saveCodeSampleReview={saveCodeReviewChange}
          />
        ) : null}
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid item xs={12}>
            {!!fileContent ? (
              <CodeEditor
                enableClipboard
                restrictAdd
                restrictEdit={!permission?.canEdit}
                restrictDelete
                data={fileContent}
                onUpdate={handleCodeChange}
                onDelete={handleCodeChange}
              />
            ) : null}
          </Grid>
        </Grid>
      </CustomTabPanel>
    </Box>
  );
};
