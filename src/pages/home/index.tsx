import { withAuth } from "src/hoc";
import { Dashboard } from "./dashbord";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItem } from "@mui/material";
import ApiService from "src/data/services";
import {
  Dashboard as DashboardIcon,
  LogoutOutlined,
} from "@mui/icons-material";
import { useAuthContext } from "src/context";
import { CodeEditorView } from "./code-editor-view";

const ROUTES = [
  {
    id: 1,
    path: "/",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
];

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const Home = withAuth(() => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { handleAuthentication } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const locState = location.state;

  const handleLogout = React.useCallback(() => {
    ApiService.logout().then(() => {
      handleAuthentication(undefined);
    });
  }, []);

  const text = React.useMemo(() => {
    const path = ROUTES.find((r: any) => locState?.id === r.id);
    return path?.label || "Dashboard";
  }, [locState]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", bgcolor: '#fff' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Augment Review System - {text}
            </Typography>
            <IconButton title="Log Out" color="inherit" onClick={handleLogout}>
              <LogoutOutlined />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
            }}
            component="nav"
          >
            {ROUTES.map((r: any) => {
              return (
                <ListItem
                  key={r.label}
                  onClick={() => navigate(r.path, { state: { id: r.id } })}
                >
                  <ListItemButton>
                    <ListItemIcon>{r.icon}</ListItemIcon>
                    <ListItemText primary={r.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Box sx={{ mt: 4, mb: 4, width: "100%", px: 4 }}>
            <Routes>
              <Route path="/" index element={<Dashboard />} />
              <Route path="/:id?" element={<CodeEditorView />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
});
