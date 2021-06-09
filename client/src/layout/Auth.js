import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
// import styled from 'styled-components';
// import NavBar from './NavBar';

// const MainLayoutRoot = styled('div')`
//   display: flex;
//   height: 100vh;
//   overflow: hidden;
//   width: 100%;
// `;

// const MainLayoutWrapper = styled('div')({
//   display: 'flex',
//   flex: '1 1 auto',
//   overflow: 'hidden',
//   paddingTop: 64,
// });

// const MainLayoutContainer = styled('div')({
//   display: 'flex',
//   flex: '1 1 auto',
//   overflow: 'hidden',
// });

// const MainLayoutContent = styled('div')({
//   flex: '1 1 auto',
//   height: '100%',
//   overflow: 'auto',
// });

const MainLayout = () => {
  // const [value, setValue] = useState(0);
  // const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Fragment key="auth wrapper">
      <Outlet />
    </Fragment>
  );
  // return (
  //   <MainLayoutRoot>
  //     <NavBar
  //       value={value}
  //       setValue={setValue}
  //       selectedIndex={selectedIndex}
  //       setSelectedIndex={setSelectedIndex}
  //     />
  //     <MainLayoutWrapper>
  //       <MainLayoutContainer>
  //         <MainLayoutContent>
  //           <Outlet />
  //         </MainLayoutContent>
  //       </MainLayoutContainer>
  //     </MainLayoutWrapper>
  //   </MainLayoutRoot>
  // );
};

export default MainLayout;
