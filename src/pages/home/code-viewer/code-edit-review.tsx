import React, { useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  base16AteliersulphurpoolLight,
  coldarkCold,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ApiService from "src/data/services";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";

const StyledGridContainer = styled(Grid)({
  border: "1px dashed #1769aa",
});

export const CodeEditReview: React.FC<{
  loading: boolean;
  codeEditReviewSample: any;
  hideReviewSection?: boolean;
  saveCodeSampleReview: (value: any) => void;
}> = ({
  codeEditReviewSample,
  loading,
  saveCodeSampleReview,
  hideReviewSection = false,
}) => {
  const [reviewStatus, setReviewStatus] = React.useState("Pending");
  const [reviewComment, setReviewComment] = React.useState("");

  const handleSaveCodeSampleReview = React.useCallback(() => {
    saveCodeSampleReview({ reviewComment, reviewStatus });
  }, [reviewComment, reviewStatus, saveCodeSampleReview]);

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      {!!codeEditReviewSample && (
        <Box>
          {!hideReviewSection && (
            <Grid container spacing={2} sx={{ py: 4 }}>
              <Grid item xs={12} md={3} sm={4} lg={3} spacing={2}>
                <Grid item spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Review Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={reviewStatus}
                      label="Review Status"
                      onChange={(e) => setReviewStatus(e.target.value)}
                    >
                      <MenuItem value={"Approved"}>Approved</MenuItem>
                      <MenuItem value={"Change Requested"}>
                        Change Requested
                      </MenuItem>
                      <MenuItem value={"Rejected"}>Rejected</MenuItem>
                      <MenuItem value={"Pending"}>Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} md={5} sm={4} lg={6} spacing={2}>
                <TextField
                  variant="outlined"
                  label="Comments"
                  multiline
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </Grid>

              <Grid item xs={12} md={4} sm={4} lg={3} spacing={2}>
                {codeEditReviewSample?.canEdit && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%", height: "100%" }}
                    disabled={!reviewStatus || !reviewComment || loading}
                    onClick={handleSaveCodeSampleReview}
                  >
                    Save
                  </Button>
                )}
              </Grid>
            </Grid>
          )}
          <StyledGridContainer container spacing={4} sx={{ py: 4, my: 4 }}>
            <Grid item xs={12} lg={6} spacing={2}>
              <Typography variant="h5">Review Status</Typography>
              <Paper>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Reviewer Level</TableCell>
                        <TableCell>Reviewer Name</TableCell>
                        <TableCell>Reviewer Status</TableCell>
                        <TableCell>Reviewer Comment</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>
                          {
                            codeEditReviewSample?.reviewerData
                              ?.reviewerOneAssignee
                          }
                        </TableCell>
                        <TableCell>
                          {
                            codeEditReviewSample?.reviewerData
                              ?.reviewerOneStatus
                          }
                        </TableCell>
                        <TableCell>
                          {
                            codeEditReviewSample?.reviewerData
                              ?.reviewerOneComment
                          }
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>
                          {
                            codeEditReviewSample?.reviewerData
                              ?.reviewerTwoAssignee
                          }
                        </TableCell>
                        <TableCell>
                          {
                            codeEditReviewSample?.reviewerData
                              ?.reviewerTwoStatus
                          }
                        </TableCell>
                        <TableCell>
                          {
                            codeEditReviewSample?.reviewerData
                              ?.reviewerTwoComment
                          }
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>
                          {codeEditReviewSample?.reviewerData?.finalReviewer}
                        </TableCell>
                        <TableCell>
                          {
                            codeEditReviewSample?.reviewerData
                              ?.finalReviewerStatus
                          }
                        </TableCell>
                        <TableCell>
                          {
                            codeEditReviewSample?.reviewerData
                              ?.finalReviewerComment
                          }
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </StyledGridContainer>
          <StyledGridContainer container spacing={4} sx={{ py: 4, my: 4 }}>
            <Grid item xs={12} lg={6} spacing={2}>
              <Typography variant="h6">
                Original Code vs Annotation Code
              </Typography>
              <Stack
                direction={"row"}
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{ maxWidth: "100%" }}
              >
                <Typography variant="body2" sx={{ maxWidth: "100%" }}>
                  <SyntaxHighlighter
                    language="javascript"
                    style={base16AteliersulphurpoolLight}
                  >
                    {codeEditReviewSample?.selected_code}
                  </SyntaxHighlighter>
                </Typography>
                <Typography variant="body2" sx={{ maxWidth: "100%" }}>
                  <SyntaxHighlighter language="javascript" style={coldarkCold}>
                    {codeEditReviewSample?.user_annotated_text}
                  </SyntaxHighlighter>
                </Typography>
              </Stack>
            </Grid>
          </StyledGridContainer>

          <StyledGridContainer container spacing={4} sx={{ py: 4, my: 4 }}>
            <Grid item xs={12} lg={6} spacing={2} sx={{ py: 4 }}>
              <Typography variant="h6">
                Tool's Response vs Annotation Code
              </Typography>
              <Stack
                direction={"row"}
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <Typography variant="body2" sx={{ maxWidth: "100%" }}>
                  <SyntaxHighlighter
                    language="javascript"
                    style={base16AteliersulphurpoolLight}
                  >
                    {codeEditReviewSample?.response}
                  </SyntaxHighlighter>
                </Typography>
                <Typography variant="body2" sx={{ maxWidth: "100%" }}>
                  <SyntaxHighlighter language="javascript" style={coldarkCold}>
                    {codeEditReviewSample?.user_annotated_text}
                  </SyntaxHighlighter>
                </Typography>
              </Stack>
            </Grid>
          </StyledGridContainer>
          <StyledGridContainer container spacing={4} sx={{ py: 4, my: 4 }}>
            <Grid item xs={6} spacing={2}>
              <Typography variant="h5">
                {codeEditReviewSample?.instruction}
              </Typography>
              <Typography variant="body2">
                <SyntaxHighlighter
                  language="javascript"
                  style={base16AteliersulphurpoolLight}
                >
                  {codeEditReviewSample?.selected_code}
                </SyntaxHighlighter>
              </Typography>
            </Grid>

            <Grid item xs={6} spacing={2}>
              <Typography variant="h5">Tool Response</Typography>
              <Typography variant="body2">
                <SyntaxHighlighter language="javascript" style={coldarkCold}>
                  {codeEditReviewSample?.response}
                </SyntaxHighlighter>
              </Typography>
            </Grid>
          </StyledGridContainer>

          <StyledGridContainer container spacing={4} sx={{ p: 2, my: 4 }}>
            <Grid
              item
              xs={12}
              lg={6}
              spacing={2}
              sx={{ px: 1, borderRight: "1px solid #b24c00" }}
            >
              <Typography variant="h5">Prefix</Typography>
              <Typography variant="body2">
                <SyntaxHighlighter
                  language="javascript"
                  style={base16AteliersulphurpoolLight}
                >
                  {codeEditReviewSample?.prefix}
                </SyntaxHighlighter>
              </Typography>
            </Grid>

            <Grid item xs={12} lg={6} spacing={2}>
              <Typography variant="h5">Suffix</Typography>
              <Typography variant="body2">
                <SyntaxHighlighter
                  language="javascript"
                  style={base16AteliersulphurpoolLight}
                >
                  {codeEditReviewSample?.suffix}
                </SyntaxHighlighter>
              </Typography>
            </Grid>
          </StyledGridContainer>
        </Box>
      )}
    </Paper>
  );
};
