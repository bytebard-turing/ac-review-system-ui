import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Moment from "moment";
import ApiService from "src/data/services";
import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import {
  CheckCircle,
  ContentCopy,
  DoNotDisturb,
  Edit,
  Pending,
  PendingActions,
  VisibilityOutlined,
} from "@mui/icons-material";

const COLOR_MAP = ["success", "error", "warning", "info"];

// Map to store the color for each user
const userColorMapping = new Map<string, string>();

// Function to get a color for a user
const getColorForUser = (userName: string): any => {
  if (userColorMapping.has(userName)) {
    // Return the existing color if the user already has one
    return userColorMapping.get(userName)!;
  } else {
    // Assign a new random color to the user
    const randomIndex = Math.floor(Math.random() * COLOR_MAP.length);
    const color = COLOR_MAP[randomIndex];
    userColorMapping.set(userName, color);
    return color;
  }
};

const columns: GridColDef<any>[] = [
  {
    field: "",
    type: "custom",
    renderCell: (params: any) => {
      return (
        <IconButton
          color="primary"
          onClick={() =>
            (window.location.href = `/my-review-samples/${params.row.id}`)
          }
        >
          <VisibilityOutlined />
        </IconButton>
      );
    },
  },
  {
    field: "id",
    headerName: "Request Id",
    width: 300,
  },

  {
    field: "sampleStatus",
    headerName: "Sample Status",
    width: 175,
    renderCell: (params: any) => {
      let icon: any, color: any;
      switch (params.row.sampleStatus) {
        case "Accepted":
          color = "#357a38";
          icon = <CheckCircle  />;
          break;
        case "Rejected":
          color = "#ab003c";
          icon = <DoNotDisturb />;
          break;
        case "Annotated":
          color = "#1769aa";
          icon = <Edit />;
          break;
      }
      return (
        <Typography
          variant="body2"
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
        >
          <span style={{ color: color, width: 24, height: 24 }}>{icon}</span> {params.row.sampleStatus}
        </Typography>
      );
    },
  },
  {
    field: "created",
    headerName: "Created",
    valueGetter: (params: any) => {
      return Moment(params.row.created).format("lll");
    },
    width: 300,
  },
  {
    field: "author",
    type: "custom",
    headerName: "Author",
    width: 150,
    renderCell: (params: any) => (
      <Chip
        color={getColorForUser(params.row.author) as any}
        avatar={
          <Avatar>{params.row.author?.slice(0, 1)?.toUpperCase()}</Avatar>
        }
        label={params.row.author}
      />
    ),
  },
  {
    field: "level",
    headerName: "Review Level",
    width: 130,
  },
  {
    field: "reviewStatus",
    headerName: "Review Status",
    width: 100,
    renderCell: (params: any) => {
      let color: any = "default",
        icon: any = null;
      switch (params.row.reviewStatus) {
        case "Approved":
          color = "success";
          icon = <CheckCircle />;
          break;
        case "Change Requested":
          color = "error";
          icon = <PendingActions />;
          break;
        case "Duplicate Instruction":
          color = "info";
          icon = <ContentCopy />;
          break;
        default:
          color = "warning";
          icon = <Pending />;
      }
      return (
        <IconButton title={params.row.reviewStatus} color={color}>
          {icon}
        </IconButton>
      );
    },
  },
  {
    field: "reviewComment",
    headerName: "Comment",
    width: 250,
  },
];

const createdSampleColumns: GridColDef<any>[] = [
  {
    field: "",
    type: "custom",
    renderCell: (params: any, ...args) => {
      return (
        <IconButton
          color="primary"
          onClick={() =>
            (window.location.href = `/my-samples/${params.row.id}`)
          }
        >
          <VisibilityOutlined />
        </IconButton>
      );
    },
  },
  {
    field: "id",
    headerName: "Request Id",
    width: 300,
  },

  {
    field: "sampleStatus",
    headerName: "Sample Status",
    width: 175,
    renderCell: (params: any) => {
      let icon: any, color: any;
      switch (params.row.sampleStatus) {
        case "Accepted":
          color = "#357a38";
          icon = <CheckCircle  />;
          break;
        case "Rejected":
          color = "#ab003c";
          icon = <DoNotDisturb />;
          break;
        case "Annotated":
          color = "#1769aa";
          icon = <Edit />;
          break;
      }
      return (
        <Typography
          variant="body2"
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
        >
          <span style={{ color: color, width: 24, height: 24 }}>{icon}</span> {params.row.sampleStatus}
        </Typography>
      );
    },
  },
  {
    field: "created",
    headerName: "Created",
    valueGetter: (params) => {
      return Moment(params.row.created).format("lll");
    },
    width: 300,
  },
  {
    field: "level",
    headerName: "Review Level",
    width: 130,
  },
  {
    field: "assignee",
    headerName: "Reviewer",
    width: 200,
    renderCell: (params: any) => (
      <Chip
        color={getColorForUser(params.row.author) as any}
        avatar={
          <Avatar>{params.row.assignee?.slice(0, 1)?.toUpperCase()}</Avatar>
        }
        label={params.row.assignee}
      />
    ),
  },
  {
    field: "reviewStatus",
    headerName: "Review Status",
    width: 100,
    renderCell: (params: any) => {
      let color: any = "default",
        icon: any = null;
      switch (params.row.reviewStatus) {
        case "Approved":
          color = "success";
          icon = <CheckCircle />;
          break;
        case "Change Requested":
          color = "error";
          icon = <PendingActions />;
          break;
        case "Duplicate Instruction":
          color = "info";
          icon = <ContentCopy />;
          break;
        default:
          color = "warning";
          icon = <Pending />;
      }
      return (
        <IconButton title={params.row.reviewStatus} color={color}>
          {icon}
        </IconButton>
      );
    },
  },
  {
    field: "reviewComment",
    headerName: "Comment",
    width: 250,
  },
];

export const Dashboard = () => {
  const [reviewRequestedRows, setReviewRequestedRows] = React.useState([]);
  const [createdSampleRows, setCreatedSampleRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    ApiService.getFiles().then((data: any) => {
      setReviewRequestedRows(data.reviewRequestedSamples);
      setCreatedSampleRows(data.createdSamples);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Review Requested</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={reviewRequestedRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            autoHeight
            pageSizeOptions={[10]}
            loading={loading}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ my: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h5">My Samples</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={createdSampleRows}
            columns={createdSampleColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            autoHeight
            pageSizeOptions={[10]}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};
