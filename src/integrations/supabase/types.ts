export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      calibrations: {
        Row: {
          calibration_standard: string | null
          certificate_generated: boolean | null
          client_id: string | null
          comments: string | null
          completed_date: string | null
          created_at: string
          device_id: string | null
          humidity: number | null
          id: string
          measurement_data: Json | null
          pressure: number | null
          scheduled_date: string
          status: Database["public"]["Enums"]["calibration_status"] | null
          technician_id: string | null
          temperature: number | null
          updated_at: string
        }
        Insert: {
          calibration_standard?: string | null
          certificate_generated?: boolean | null
          client_id?: string | null
          comments?: string | null
          completed_date?: string | null
          created_at?: string
          device_id?: string | null
          humidity?: number | null
          id?: string
          measurement_data?: Json | null
          pressure?: number | null
          scheduled_date: string
          status?: Database["public"]["Enums"]["calibration_status"] | null
          technician_id?: string | null
          temperature?: number | null
          updated_at?: string
        }
        Update: {
          calibration_standard?: string | null
          certificate_generated?: boolean | null
          client_id?: string | null
          comments?: string | null
          completed_date?: string | null
          created_at?: string
          device_id?: string | null
          humidity?: number | null
          id?: string
          measurement_data?: Json | null
          pressure?: number | null
          scheduled_date?: string
          status?: Database["public"]["Enums"]["calibration_status"] | null
          technician_id?: string | null
          temperature?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calibrations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibrations_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibrations_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          calibration_id: string | null
          certificate_number: string
          created_at: string
          id: string
          issued_date: string | null
          pdf_url: string | null
          valid_until: string | null
        }
        Insert: {
          calibration_id?: string | null
          certificate_number: string
          created_at?: string
          id?: string
          issued_date?: string | null
          pdf_url?: string | null
          valid_until?: string | null
        }
        Update: {
          calibration_id?: string | null
          certificate_number?: string
          created_at?: string
          id?: string
          issued_date?: string | null
          pdf_url?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_calibration_id_fkey"
            columns: ["calibration_id"]
            isOneToOne: false
            referencedRelation: "calibrations"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          industry: string | null
          name: string
          phone: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          industry?: string | null
          name: string
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          industry?: string | null
          name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      devices: {
        Row: {
          calibration_interval: number | null
          client_id: string | null
          created_at: string
          device_type: string | null
          id: string
          last_calibration_date: string | null
          location: string | null
          manufacturer: string | null
          model: string | null
          name: string
          next_calibration_date: string | null
          notes: string | null
          serial_number: string
          status: Database["public"]["Enums"]["device_status"] | null
          updated_at: string
        }
        Insert: {
          calibration_interval?: number | null
          client_id?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          last_calibration_date?: string | null
          location?: string | null
          manufacturer?: string | null
          model?: string | null
          name: string
          next_calibration_date?: string | null
          notes?: string | null
          serial_number: string
          status?: Database["public"]["Enums"]["device_status"] | null
          updated_at?: string
        }
        Update: {
          calibration_interval?: number | null
          client_id?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          last_calibration_date?: string | null
          location?: string | null
          manufacturer?: string | null
          model?: string | null
          name?: string
          next_calibration_date?: string | null
          notes?: string | null
          serial_number?: string
          status?: Database["public"]["Enums"]["device_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "devices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      calibration_status:
        | "scheduled"
        | "in_progress"
        | "completed"
        | "overdue"
        | "cancelled"
      device_status: "active" | "inactive" | "maintenance" | "retired"
      user_role: "admin" | "technician" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      calibration_status: [
        "scheduled",
        "in_progress",
        "completed",
        "overdue",
        "cancelled",
      ],
      device_status: ["active", "inactive", "maintenance", "retired"],
      user_role: ["admin", "technician", "client"],
    },
  },
} as const
