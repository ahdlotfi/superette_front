import { Button, Stack, TextField } from "@mui/material";
import React, { useReducer } from "react";

export default function ArticleEditor({ id, onChange }) {
  const [state, dispatch] = useReducer(reducer, null);

  React.useEffect(() => {
    getArticle(id);
  }, [id]);

  const getArticle = async (id) => {
    dispatch({
      type: "INIT",
      payload: {
        designation: "",
        prix: 0,
        qte_stock: 0,
      },
    });
  };

  const handleSave = async () => {
    console.log(state);
    let ff = new FormData();
    ff.set("designation", state.designation);
    ff.set("prix", state.prix);
    ff.set("qte_stock", state.qte_stock);
    const res = await fetch("http://localhost:4000/articles/", {
      method: "post",
      mode: "cors",
      config: { headers: { "Access-Control-Allow-Origin": "*" } },
      body: ff,
    }).then((res) => res.json());
    if (!res.success) {
      alert(res.message);
      return;
    }
    onChange();
  };

  if (!state) {
    return null;
  }

  return (
    <div style={{ minWidth: 350 }}>
      <Stack spacing={2}>
        <TextField
          label="Désignation"
          value={state.designation}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              payload: { key: "designation", value: e.target.value },
            })
          }
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="Prix"
          type="number"
          value={state.prix}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              payload: { key: "prix", value: e.target.value },
            })
          }
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="Qté en stock"
          type="number"
          value={state.qte_stock}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              payload: { key: "qte_stock", value: e.target.value },
            })
          }
          variant="outlined"
          size="small"
          fullWidth
        />
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button variant="outlined" onClick={handleSave}>
            Save changes
          </Button>
        </div>
      </Stack>
    </div>
  );
}

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "INIT":
      return { ...payload };
    case "SET_FIELD":
      return { ...state, [payload.key]: payload.value };
    default:
      return state;
  }
};
