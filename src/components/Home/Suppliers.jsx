import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { storeCategorys } from "../../store/ViewProductHome";
import { useRecoilState } from "recoil";
import axios from "axios";
import { toast } from "react-toastify";
const defaultTheme = createTheme();

function Suppliers() {
  // get cookios
  const [getCookies] = useCookies(["token","_id"]);

  // reset feilds
  const [feildNeed, setfeildNeed] = React.useState("");
  const [feilddetails, setfeilddetails] = React.useState("");
  const [feildquantity, setfeildquantity] = React.useState("");

  // Handle Error Data
  const [mainError, setMainError] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  // Handle select category
  const [categorySearch, setCategorySearch] = React.useState("");
  const [categorys] = useRecoilState(storeCategorys);
  const handleChangeCatigorySearch = (e) => {
    setCategorySearch(e.target.value);
  };
  // console.log("getCookies.token", getCookies.token);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    setfeildNeed(dataForm.get("youNeed"));
    setfeilddetails(dataForm.get("details"));
    setfeildquantity(dataForm.get("quantity"));
    const data = {
      titleNeed: dataForm.get("youNeed"),
      details: dataForm.get("details"),
      quantity: dataForm.get("quantity"),
      category: categorySearch,
    };
    if (data.titleNeed === "") {
      return setMainError("At least enter the name of the product");
    }
    await axios
      .post(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/reqProduct`,
        {
          titleNeed: data.titleNeed,
          details: data.details,
          category: data.category,
          qauntity: data.quantity,
          user: getCookies._id,
        },
        {
          headers: { Authorization: getCookies.token },
        }
      )
      .then(() => {
        setLoading(false);
        toast.success("Successful submission", {
          position: "top-right",
          // autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // clear feilds
        setCategorySearch("");
        setfeildNeed("");
        setfeilddetails("");
        setfeildquantity("");
      })
      .catch((err) => setMainError(err.response?.message));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <div
          className={`relative flex flex-wrap gap-10 mt-2 bg-gradient-to-r overflow-hidden from-blue-600 to-blue-400 via-blue-500 rounded-lg shadow-lg`}
        >
          <div
            className={`absolute z-10 w-full h-full opacity-30 bg-[url('https://s3-alpha-sig.figma.com/img/4e80/e83f/e745e5ac4af0470ed5521db4af955316?Expires=1694390400&Signature=OsZ3D~XBElNzQ52eV-Sr7ERBVceyyteob8qrW0TMu-MVNu~DVuk~dNaud7mLemV2olimcu~Te7aJzP7RwY0ucjuck1Gt1Xh9DewJ9yFqstu0WZ~cvhPa8OsNztorOjc-hPHHkGLjqgzvQqduQNKywxuVzemOzk5z34nmJ90~2PmaL6p4BqZIq-6SHPoO~j~XWdOZx51VuK~rkCAOmyL79KHRfD-Mv7g9AIMhP8s~H3caXbMujEwpo~~i-nDKscsIiLFG2xomoQwrEr4669JyCawJhgsiJfmVCErMMtHCzmvti~juLwkbaomstuWgeukatHtQ20my9hlTbGgt7xQMMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4')]`}
            style={{
              backgroundBlendMode: "multiply",
            }}
          ></div>
          <div
            className={`z-20 p-10 flex flex-wrap justify-between w-full gap-10`}
          >
            <div>
              <p className={`text-[#FFF] text-4xl font-semibold`}>
                An easy way to send <br /> requests to all suppliers
              </p>
              <p className={`text-[#FFF] text-base font-normal`}>
                Lorem ipsum dolor sit amet, consectetur adipisicing <br /> elit,
                sed do eiusmod tempor incididunt.
              </p>
            </div>
            <div
              className={`bg-[#FFF] rounded-lg py-3 px-2 flex flex-col gap-2`}
            >
              <p className={`text-[#1C1C1C] text-xl font-semibold`}>
                Send quote to suppliers
              </p>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: "500px",
                }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    value={feildNeed}
                    disabled={loading}
                    onChange={(e) => {
                      setfeildNeed(e.target.value);
                      setMainError("");
                    }}
                    margin="normal"
                    required
                    fullWidth
                    id="What item you need?"
                    label="What item you need?"
                    name="youNeed"
                  />
                  <TextareaAutosize
                    value={feilddetails}
                    disabled={loading}
                    maxRows={6}
                    className={`py-3 rounded-md border-2 px-2 w-full`}
                    onChange={(e) => {
                      setfeilddetails(e.target.value);
                      setMainError("");
                    }}
                    placeholder="Type more details"
                    name="details"
                  />
                  <div className={`flex items-center  justify-between gap-3`}>
                    <TextField
                      value={feildquantity}
                      disabled={loading}
                      type="number"
                      className=""
                      onChange={(e) => {
                        setfeildquantity(e.target.value);
                        setMainError("");
                      }}
                      margin="normal"
                      fullWidth
                      id="Quantity"
                      label="Quantity"
                      name="quantity"
                    />
                    <Select
                      disabled={loading}
                      onChange={handleChangeCatigorySearch}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      style={{
                        borderRadius: "6px",
                        fontSize: "1rem",
                        height: "100%",
                      }}
                      value={categorySearch || ""}
                    >
                      <MenuItem value="">
                        <em>All Category</em>
                      </MenuItem>
                      {categorys.map((cat) => (
                        <MenuItem value={cat.name} key={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div
                    className={`bg-red-500 text-white rounded-t-lg rounded-b-lg text-center `}
                  >
                    {mainError}
                  </div>
                  <Button
                    disabled={loading}
                    type={getCookies.token ? "submit" : "reset"}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {getCookies.token
                      ? "Send inquiry"
                      : "Please Login and send your message!"}{" "}
                    {loading && <div className="spinner ms-2"></div>}
                  </Button>
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Suppliers;
