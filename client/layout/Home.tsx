import React from 'react';
import Image from 'next/image';
import { AppShell, Header, Navbar, Box, Anchor } from '@mantine/core';

function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding='md'
      navbar={
        <Navbar width={{ base: 300 }} height={500} p='xs'>
          Side items
        </Navbar>
      }
      header={
        <Header height={60} p='xs'>
          <Box>
            <Box>
              <Image src='/logo.png' alt='logo' width='100px' height='40px' />
            </Box>
          </Box>
        </Header>
      }
    >
      {' '}
      {children}
    </AppShell>
  );
}

export default HomePageLayout;