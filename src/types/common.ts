/**
 * Common type definitions used across the application
 */

/**
 * Sort order direction
 */
export type SortOrder = "asc" | "desc";

/**
 * Pagination parameters for list queries
 */
export interface PaginationParams {
  /** Number of items to skip */
  offset?: number;
  /** Number of items to return */
  limit?: number;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  /** Array of items */
  data: T[];
  /** Total count of items */
  count: number;
  /** Current offset */
  offset: number;
  /** Current limit */
  limit: number;
}

/**
 * Props for empty state component
 */
export interface EmptyStateProps {
  /** Optional icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Message text to display */
  message: string;
  /** Optional action link */
  action?: {
    label: string;
    href: string;
  };
}

/**
 * API error response
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * Generic async state
 */
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
}
