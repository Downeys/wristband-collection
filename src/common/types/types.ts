import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';

export interface IconProps {
  styling?: string;
  selected?: boolean;
  onClick?: () => void;
}

export interface MenuItem {
  label: string;
  link: string;
  protected: boolean;
}

export type CustomMiddleware = (request: NextRequest, event: NextFetchEvent, response: NextResponse) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;
