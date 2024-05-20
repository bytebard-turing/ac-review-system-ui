import * as React from "react";
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ApiService from "src/data/services";
import { Avatar, Chip, Divider, Typography } from "@mui/material";

const columns: GridColDef<any>[] = [
  {
    field: "id",
    headerName: "Request Id",
    width: 300,
  },
  {
    field: "updated",
    headerName: "Updated",
    valueGetter: (params) => {
      return new Date(params.row.updated).toLocaleString();
    },
    width: 300,
  },
  {
    field: "author",
    type: 'custom',
    headerName: "Author",
    width: 150,
    renderCell: (params: any) => <Chip avatar={<Avatar>{params.row.author?.slice(0, 1)?.toUpperCase()}</Avatar>} label={params.row.author} />
  },
  {
    field: "level",
    headerName: "Review Level",
    width: 130,
  },
  {
    field: "reviewStatus",
    headerName: "Review Status",
    width: 250,
    renderCell: (params: any) => {
      let color: any = 'warning';
      if(params.row.reviewStatus === 'Approved') {
        color = "success"
      }
      else if(params.row.reviewStatus === 'Change Requested') {
        color = "error"
      }
      return <Chip color={color} label={params.row.reviewStatus} />
    }
  },
  {
    field: "reviewComment",
    headerName: "Comment",
    width: 250,
  },
];

const createdSampleColumns: GridColDef<any>[] = [
  {
    field: "id",
    headerName: "Request Id",
    width: 300,
  },
  {
    field: "updated",
    headerName: "Updated",
    valueGetter: (params) => {
      return new Date(params.row.updated).toLocaleString();
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
    renderCell: (params: any) => <Chip avatar={<Avatar>{params.row.assignee?.slice(0, 1)?.toUpperCase()}</Avatar>} label={params.row.assignee} />
  },
  {
    field: "reviewStatus",
    headerName: "Review Status",
    width: 250,
    renderCell: (params: any) => {
      let color: any = 'warning';
      if(params.row.reviewStatus === 'Approved') {
        color = "success"
      }
      else if(params.row.reviewStatus === 'Change Requested') {
        color = "error"
      }
      return <Chip color={color} label={params.row.reviewStatus} />
    }
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
