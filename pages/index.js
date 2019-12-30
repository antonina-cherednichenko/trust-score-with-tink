import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

// const Index = ({ users }) => (
//   <ul>
//     {users.map(user => (
//       <li key={user.id}>
//         <Link href="/user/[id]" as={`/user/${user.id}`}>
//           <a>{`User ${user.id}`}</a>
//         </Link>
//       </li>
//     ))}
//   </ul>
// )
//
// Index.getInitialProps = async () => {
//   const response = await fetch('http://localhost:3000/api/users')
//   const users = await response.json()
//
//   return { users }
// }
//
// export default Index

//import React from "react";
import { Button } from "reactstrap";
//import PropTypes from "prop-types";

export const Index = ({ locale, market, scope, ssn }) => {
  //const ssnData = ssn ? "&input_username=" + ssn : "";
  // const link = "https://link.tink.com/1.0/authorize/?client_id=274d0de67363448f9f1894a913370636&redirect_uri=http://localhost:3000/api/callback&scope=accounts:read,investments:read,transactions:read,user:read,credentials:read,identity:read,statistics:read&market=SE&locale=en_US&test=true";
  // const link =
  //   "https://link.tink.com/1.0/authorize/?" +
  //   "client_id=" +
  //   //process.env.REACT_APP_CLIENT_ID +
  //   "342965d912164a8886f4b48c55c9a84a" +
  //   "&redirect_uri=http://localhost:3000/api/callback" +
  //   "&scope=" +
  //   // scope +
  //   "accounts:read,investments:read,transactions:read,user:read,credentials:read,identity:read,statistics:read" +
  //   // ssnData +
  //   "&market=" +
  // //  market +
  //   "GB" +
  //   "&locale=" +
  // //  locale +
  //   "en_US" +
  //   "&test=true";

  const link = "https://link.tink.com/1.0/authorize/?client_id=342965d912164a8886f4b48c55c9a84a&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fcallback&scope=accounts:read,investments:read,transactions:read,user:read&market=SE&locale=en_US&test=true";

  return <Button href={link}>Connect Bank</Button>;
};

// Index.propTypes = {
//   ssn: PropTypes.string,
//   scope: PropTypes.string.isRequired,
//   market: PropTypes.string.isRequired,
//   locale: PropTypes.string.isRequired
// };

export default Index;
