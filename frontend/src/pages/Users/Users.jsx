import React from "react";
import DefaultLayout from "../../components/layout/Layout";
import UsersTable from "../../components/UsersTable/UsersTable";

const Users = () => {
  return (
    <DefaultLayout>
        <UsersTable />
    </DefaultLayout>
  );
};

export default Users;
