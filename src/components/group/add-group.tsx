"use client";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { Spacing } from "../spacing";
import { gql, useMutation } from "@apollo/client";

type Group = {
  id: string;
  name: string;
  limit: number;
};

const ADD_GROUP_MUTATION = gql`
  mutation AddGroup($name: String!, $limit: Float!, $description: String) {
    addGroup(name: $name, limit: $limit, description: $description) {
      name
      description
      limit
    }
  }
`;
const AddGroup = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [mutation] = useMutation(ADD_GROUP_MUTATION);
  const form = useFormik({
    initialValues: {
      name: "",
      description: "",
      limit: 0,
    },
    onSubmit: (values) => {
      mutation({
        variables: {
          name: values.name,
          limit: Number(values.limit),
          description: values.description,
        },
      });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <form onSubmit={form.handleSubmit}>
        <Box px={4} py={2}>
          <Box display={"flex"} mb={1} gap={1}>
            <Typography>Add Group</Typography>
          </Box>
          <Box display={"flex"} gap={1}>
            <Box display={"flex"} gap={1} flexDirection={"column"}>
              <TextField
                required
                label="Name of Group"
                name="name"
                onChange={form.handleChange}
              />
              <TextField
                label="Description"
                name="description"
                onChange={form.handleChange}
              />
              <TextField
                required
                inputMode="numeric"
                label="Gift Limit"
                name="limit"
                onChange={form.handleChange}
              />
            </Box>
          </Box>
          <Spacing />
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default AddGroup;
