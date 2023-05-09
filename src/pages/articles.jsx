import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Dlg from "../components/Dlg";
import ArticleEditor from "./ArticleEditor";

export default function Articles() {
  const [data, setData] = useState([]);
  const [openDlg, setOpenDlg] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (_) => {
    const res = await fetch("http://localhost:4000/articles/", {
      method: "get",
      mode: "cors",
      config: { headers: { "Access-Control-Allow-Origin": "*" } },
      responseType: "text",
    }).then((res) => res.json());
    console.log(res);
    setData(res.data);
  };
  return (
    <div>
      <h3>Liste des articles</h3>
      <IconButton
        color="secondary"
        aria-label="add"
        onClick={(_) => setOpenDlg(true)}
      >
        <AddIcon />
      </IconButton>
      <ul>
        {data.map((e) => (
          <li key={e.id}>{e.designation}</li>
        ))}
      </ul>

      {openDlg && (
        <Dlg title="test" open={openDlg} onClose={(_) => setOpenDlg(false)}>
          <ArticleEditor
            id={0}
            onChange={(_) => {
              setOpenDlg(false);
              getData();
            }}
          />
        </Dlg>
      )}
    </div>
  );
}
