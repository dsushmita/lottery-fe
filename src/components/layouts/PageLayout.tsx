'use client';
import React, { ReactNode } from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import MainLayout from './MainLayout';


interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: ReactNode;
}

export default function PageLayout({
  children,
  title,
  subtitle,
  breadcrumbs,
  actions
}: PageLayoutProps) {
  return (
    <MainLayout>
      <Box sx={{ mb: 4 }}>
        {breadcrumbs && (
          <Breadcrumbs sx={{ mb: 2 }}>
            {breadcrumbs.map((crumb, index) => (
              <Link
                key={index}
                color="inherit"
                href={crumb.href}
                underline="hover"
              >
                {crumb.label}
              </Link>
            ))}
          </Breadcrumbs>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {actions && <Box>{actions}</Box>}
        </Box>
      </Box>

      {children}
    </MainLayout>
  );
}