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
  userName = userName?.split("@")?.[0];
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

const baseColumns = [
  {
    field: "id",
    headerName: "Request Id",
    width: 300,
  },
  {
    field: "created",
    headerName: "Updated",
    valueGetter: (params: any) => {
      return Moment(params.row.udpated).format("lll");
    },
    width: 200,
  },
  {
    field: "author",
    type: "custom",
    headerName: "Author",
    width: 175,
    renderCell: (params: any) => (
      <Chip
        color={getColorForUser(params.row.reviewerData.author) as any}
        avatar={
          <Avatar>
            {params.row.reviewerData.author?.slice(0, 1)?.toUpperCase()}
          </Avatar>
        }
        label={params.row.reviewerData.author}
      />
    ),
  },
  {
    field: "currentAssignedTo",
    type: "custom",
    headerName: "Assigned To",
    width: 150,
    renderCell: (params: any) => (
      <Chip
        color={
          getColorForUser(params.row.reviewerData.currentAssignedTo) as any
        }
        avatar={
          <Avatar>
            {params.row.reviewerData.currentAssignedTo
              ?.slice(0, 1)
              ?.toUpperCase()}
          </Avatar>
        }
        label={params.row.reviewerData.currentAssignedTo}
      />
    ),
  },
  {
    field: "reviewerData",
    headerName: "Status",
    width: 175,
    renderCell: (params: any) => {
      let color: any = "default",
        icon: any = null;
      switch (params.row.reviewerData?.status) {
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
        <Typography
          component={"p"}
          variant="body2"
          title={params.row.reviewerData?.status}
        >
          <IconButton color={color}>{icon}</IconButton>{" "}
          {params.row.reviewerData?.status}
        </Typography>
      );
    },
  },
];

const columns: GridColDef<any>[] = [
  {
    field: "",
    type: "custom",
    renderCell: (params: any) => {
      return (
        <IconButton
          color="primary"
          onClick={() =>
            (window.location.href = `/${params.row.fileId}`)
          }
        >
          <VisibilityOutlined />
        </IconButton>
      );
    },
  },
  ...baseColumns,
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
            (window.location.href = `/${params.row.fileId}`)
          }
        >
          <VisibilityOutlined />
        </IconButton>
      );
    },
  },
  ...baseColumns,
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
