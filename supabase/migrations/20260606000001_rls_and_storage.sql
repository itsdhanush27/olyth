-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
  RETURN user_role IN ('Super Admin', 'Admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users can read and update their own. Admins can read/update all.
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE USING (public.is_admin());

-- Waitlist, Sales, Support, Feedback: Anyone can insert. Only admins can read/update/delete.
CREATE POLICY "Anyone can insert waitlist" ON public.waitlist_entries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage waitlist" ON public.waitlist_entries FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can insert sales inquiries" ON public.sales_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage sales inquiries" ON public.sales_inquiries FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can insert support tickets" ON public.support_tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own support tickets" ON public.support_tickets FOR SELECT USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));
CREATE POLICY "Admins manage support tickets" ON public.support_tickets FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can insert feedback" ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage feedback" ON public.feedback FOR ALL USING (public.is_admin());

-- Subscriptions: Admins manage all, users view their own.
CREATE POLICY "Admins manage subscriptions" ON public.subscriptions FOR ALL USING (public.is_admin());
CREATE POLICY "Users view own subscriptions" ON public.subscriptions FOR SELECT USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Categories and Products: Anyone can read. Only admins can modify.
CREATE POLICY "Anyone can read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins manage products" ON public.products FOR ALL USING (public.is_admin());

-- Orders and Order Items: Users view their own, Admins manage all.
CREATE POLICY "Users view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins manage orders" ON public.orders FOR ALL USING (public.is_admin());

CREATE POLICY "Users view own order items" ON public.order_items FOR SELECT USING (order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own order items" ON public.order_items FOR INSERT WITH CHECK (order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid()));
CREATE POLICY "Admins manage order items" ON public.order_items FOR ALL USING (public.is_admin());

-- Storage Policies
-- Assuming a bucket named 'public_assets' for products/categories
-- and 'private_assets' for support attachments
INSERT INTO storage.buckets (id, name, public) VALUES ('public_assets', 'public_assets', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('private_assets', 'private_assets', false) ON CONFLICT DO NOTHING;

CREATE POLICY "Public Assets are viewable by everyone" ON storage.objects FOR SELECT USING (bucket_id = 'public_assets');
CREATE POLICY "Public Assets managed by admins" ON storage.objects FOR ALL USING (bucket_id = 'public_assets' AND public.is_admin());

CREATE POLICY "Private Assets viewable by admins and owners" ON storage.objects FOR SELECT USING (bucket_id = 'private_assets' AND (public.is_admin() OR auth.uid() = owner));
CREATE POLICY "Anyone can upload private assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'private_assets');
CREATE POLICY "Admins manage private assets" ON storage.objects FOR ALL USING (bucket_id = 'private_assets' AND public.is_admin());
