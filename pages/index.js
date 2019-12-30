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


import { Button } from "reactstrap";


export const Index = () => {
  // const scope = "accounts:read,investments:read,transactions:read,user:read,statistics:read";
  // const link1 =
  //   "https://link.tink.com/1.0/authorize/?" +
  //   "client_id=" + process.env.REACT_APP_CLIENT_ID +
  //   "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fcallback" +
  //   "&scope=" + scope +
  //   "&market=" + "SE" +
  //   "&locale=" + "en_US" +
  //   "&test=true";

//  console.log("link1 = ", link1);
                //https://link.tink.com/1.0/authorize/?client_id=342965d912164a8886f4b48c55c9a84a&redirect_uri=http://localhost:3000/api/callback&scope=accounts:read,investments:read,transactions:read,user:read,statistics:read&market=SE&locale=en_US&test=true

  const link = `https://link.tink.com/1.0/authorize/?client_id=342965d912164a8886f4b48c55c9a84a&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fcallback&scope=accounts:read,investments:read,transactions:read,user:read,statistics:read&market=SE&locale=en_US&test=true`;

  return <Button href={link}>Connect Bank</Button>;
};

export default Index;
