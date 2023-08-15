export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      documents: {
        Row: {
          content: string | null;
          embedding: string | null;
          id: number;
        };
        Insert: {
          content?: string | null;
          embedding?: string | null;
          id?: number;
        };
        Update: {
          content?: string | null;
          embedding?: string | null;
          id?: number;
        };
        Relationships: [];
      };
      food_recs: {
        Row: {
          description: string | null;
          id: number;
          image: string | null;
          name: string | null;
        };
        Insert: {
          description?: string | null;
          id?: number;
          image?: string | null;
          name?: string | null;
        };
        Update: {
          description?: string | null;
          id?: number;
          image?: string | null;
          name?: string | null;
        };
        Relationships: [];
      };
      my_foods: {
        Row: {
          created_at: string | null;
          done: boolean | null;
          id: number;
          name: string | null;
          rec_id: number | null;
          uuid: string | null;
        };
        Insert: {
          created_at?: string | null;
          done?: boolean | null;
          id?: number;
          name?: string | null;
          rec_id?: number | null;
          uuid?: string | null;
        };
        Update: {
          created_at?: string | null;
          done?: boolean | null;
          id?: number;
          name?: string | null;
          rec_id?: number | null;
          uuid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "my_foods_name_fkey";
            columns: ["name"];
            referencedRelation: "food_recs";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "my_foods_rec_id_fkey";
            columns: ["rec_id"];
            referencedRelation: "food_recs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "my_foods_uuid_fkey";
            columns: ["uuid"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          email: string | null;
          id: string;
          user_name: string | null;
        };
        Insert: {
          email?: string | null;
          id: string;
          user_name?: string | null;
        };
        Update: {
          email?: string | null;
          id?: string;
          user_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      ivfflathandler: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      match_documents: {
        Args: {
          query_embedding: string;
          match_threshold: number;
          match_count: number;
        };
        Returns: Array<{
          id: number;
          content: string;
          similarity: number;
        }>;
      };
      vector_avg: {
        Args: {
          "": number[];
        };
        Returns: string;
      };
      vector_dims: {
        Args: {
          "": string;
        };
        Returns: number;
      };
      vector_norm: {
        Args: {
          "": string;
        };
        Returns: number;
      };
      vector_out: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      vector_send: {
        Args: {
          "": string;
        };
        Returns: string;
      };
      vector_typmod_in: {
        Args: {
          "": unknown[];
        };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
