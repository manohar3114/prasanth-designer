export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      designs: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image_url: string;
          category: string;
          price: number | null;
          is_featured: boolean;
          created_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string | null;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          total_price: number;
          tailoring_notes: string | null;
          created_at: string;
          delivery_address: string | null;
        };
      };
      measurements: {
        Row: {
          id: string;
          order_id: string | null;
          user_id: string | null;
          data: Record<string, any>;
          created_at: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string;
          date: string;
          time: string;
          status: 'scheduled' | 'cancelled' | 'completed';
          notes: string | null;
          created_at: string;
        };
      };
      uploads: {
        Row: {
          id: string;
          order_id: string | null;
          user_id: string | null;
          file_url: string;
          file_type: string;
          created_at: string;
        };
      };
    };
  };
};

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
}

export interface Design {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  price: number;
  is_featured: boolean;
}

export interface CartItem extends Design {
  customization_notes?: string;
  quantity: number;
}

export interface Appointment {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: 'scheduled' | 'cancelled' | 'completed';
  notes: string;
}

export interface MeasurementInstance {
  id: string;
  user_id: string | null;
  order_id: string | null;
  data: Record<string, any>;
  created_at: string;
}
