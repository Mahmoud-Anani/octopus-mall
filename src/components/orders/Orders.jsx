import React from "react";
// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// Silf Component
import DiscountOf100 from "../ads/DiscountOf100";
import Footer from "../layout/Footer";
// Fetching
import axios from "axios";
// Cookies
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Orders() {
  // get Cookies
  const [getCookies] = useCookies(["token"]);
  // redirect if user not logged
  const navigate = useNavigate();

  // loading
  const [loading, setLoading] = React.useState(true);
  // handle data of orders user
  const [count_orders, setcount_orders] = React.useState(0);
  const [mainData, setMainData] = React.useState([]);
  const [allProductInOrders, setAllProductInOrdersa] = React.useState([]);

  // if user haven't an any orders
  const [handleErrorsOrders, setHandleErrorsOrders] = React.useState("");

  // get all my orders
  async function getOrders() {
    await axios
      .get(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/order/me`, {
        headers: {
          Authorization: getCookies.token,
        },
      })
      .then((res) => {
        setcount_orders(res.data.count_orders);
        setMainData(res.data.data);
        res.data.data.map((ord) =>
          ord.cartItems.map((cartItem) =>
            setAllProductInOrdersa([...allProductInOrders, cartItem])
          )
        );
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        if (
          err.response.data?.message === "You haven't made any request before"
        ) {
          setLoading(false);
          return setHandleErrorsOrders("You haven't made any request before");
        }
      });
  }

  React.useEffect(() => {
    if (getCookies.token === undefined || getCookies.token === "undefined") {
      return navigate("/auth/sign-in");
    }
    getOrders();
  }, []);

  // tests
  // console.log("allProductInOrders", allProductInOrders);
  // console.log("mainData", mainData);

  if (loading) {
    return (
      <div className="h-full my-5">
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (handleErrorsOrders) {
    return (
      <div className={`flex flex-col text-center py-5`}>
        <h1 className={`text-red-500 text-lg`}>
          You don't have any ordering process before. Go now and fill your bag...
        </h1>
        <div className={`mt-5`}>
          <Link className={`bg-green-300 w-fit p-3 rounded-lg hover:bg-green-400 hover:text-white`} to={`/products`}>
            Products
          </Link>
        </div>
      </div>
    );
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <h2>Orders({count_orders})</h2>
        <div style={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
        <DiscountOf100 />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default Orders;
