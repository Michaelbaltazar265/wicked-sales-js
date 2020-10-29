--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public."cartItems" DROP CONSTRAINT IF EXISTS "cartItems_pkey";
ALTER TABLE IF EXISTS public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."products_productId_seq";
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."orders_orderId_seq";
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public."carts_cartId_seq";
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public."cartItems_cartItemId_seq";
DROP TABLE IF EXISTS public."cartItems";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
1	1	1	2999
3	1	1	2999
4	13	2999	1
5	13	2595	2
6	13	2900	3
7	13	2999	1
8	13	2999	1
9	13	2999	1
10	13	2999	1
11	13	2595	2
12	13	2999	1
13	13	2999	1
14	13	2999	1
15	13	2595	2
16	13	2900	3
17	13	9900	5
18	13	830	6
19	13	2999	1
20	13	2999	1
21	13	999	4
22	13	2999	1
23	13	2900	3
24	13	999	4
25	13	2999	1
26	13	2999	1
27	13	2999	1
28	31	2900	3
29	31	2999	1
30	31	2595	2
31	31	2595	2
32	31	2595	2
33	13	2999	1
34	13	2999	1
35	13	2999	1
36	13	2999	1
37	13	2999	1
38	14	2900	3
39	14	830	6
40	14	9900	5
41	14	2595	2
42	14	9900	5
43	14	2999	1
44	14	9900	5
45	14	830	6
46	14	2900	3
47	15	2595	2
48	14	2595	2
49	14	2900	3
50	14	2595	2
51	14	9900	5
52	14	830	6
53	42	4	999
54	54	2	2595
55	55	3	2900
56	55	4	999
57	56	5	9900
58	57	1	2999
59	14	2999	1
60	14	2595	2
61	15	2595	2
62	15	2999	1
63	15	2900	3
64	15	2900	3
65	15	2999	1
66	15	2595	2
67	15	2900	3
68	15	999	4
69	15	9900	5
70	15	830	6
71	15	2595	2
72	15	2595	2
73	15	2900	3
74	15	2595	2
75	15	2999	1
76	15	2900	3
77	14	2999	1
78	14	2900	3
79	14	999	4
80	14	830	6
81	14	999	4
82	14	999	4
83	14	999	4
84	14	9900	5
85	14	2999	1
86	14	2900	3
87	14	2999	1
88	14	999	4
89	14	2900	3
90	14	2595	2
91	20	999	4
92	21	9900	5
94	23	830	6
96	25	9900	5
97	26	2900	3
98	26	2595	2
99	26	2595	2
100	26	2595	2
101	26	2999	1
102	26	2595	2
103	26	2900	3
104	26	830	6
105	34	2999	1
106	35	2900	3
107	38	2999	1
108	39	1	2999
109	40	3	2900
110	40	1	2999
111	41	1	2999
112	41	2	2595
113	41	3	2900
114	41	2	2595
115	42	4	999
116	42	5	9900
117	42	1	2999
118	43	3	2900
119	43	2	2595
120	43	4	999
121	43	2	2595
122	43	3	2900
123	44	3	2900
124	43	2	2595
125	45	2	2595
126	45	6	830
127	46	2	2595
128	46	3	2900
129	46	4	999
130	46	1	2999
131	47	6	830
132	47	2	2595
133	47	4	999
134	47	3	2900
135	48	5	9900
136	48	6	830
137	48	4	999
138	49	3	2900
139	49	5	9900
140	49	2	2595
141	49	1	2999
142	49	5	9900
143	50	2	2595
144	50	2	2595
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-10-12 21:56:41.256086+00
2	2020-10-12 21:57:01.631576+00
3	2020-10-12 21:57:07.975306+00
4	2020-10-12 22:18:25.369046+00
5	2020-10-12 22:18:25.896306+00
6	2020-10-12 22:18:28.430523+00
7	2020-10-12 22:18:30.290252+00
8	2020-10-12 22:18:31.032777+00
9	2020-10-12 22:18:31.602733+00
10	2020-10-12 22:25:17.31476+00
11	2020-10-12 22:43:13.957791+00
12	2020-10-12 22:47:09.848442+00
13	2020-10-14 00:50:16.309728+00
14	2020-10-14 16:57:17.915182+00
15	2020-10-14 17:47:04.719298+00
16	2020-10-14 18:31:20.634271+00
17	2020-10-14 18:31:21.928775+00
18	2020-10-14 18:31:22.664461+00
19	2020-10-14 21:42:26.305669+00
20	2020-10-14 21:43:46.626223+00
21	2020-10-14 21:44:38.192428+00
22	2020-10-14 21:45:48.478765+00
23	2020-10-14 21:46:21.391577+00
24	2020-10-14 21:47:28.522401+00
25	2020-10-14 21:49:14.65066+00
26	2020-10-14 21:51:29.264438+00
27	2020-10-14 21:52:50.048607+00
28	2020-10-14 22:06:43.676424+00
29	2020-10-14 22:08:13.347353+00
30	2020-10-14 22:10:59.401295+00
31	2020-10-14 22:13:33.249769+00
32	2020-10-14 22:15:18.707319+00
33	2020-10-14 22:16:39.159409+00
34	2020-10-14 22:20:10.197446+00
35	2020-10-14 22:21:07.742444+00
36	2020-10-14 22:22:37.910335+00
37	2020-10-14 22:24:33.657755+00
38	2020-10-14 22:25:22.276766+00
39	2020-10-14 22:27:01.411646+00
40	2020-10-14 22:31:12.065917+00
41	2020-10-14 23:59:35.111688+00
42	2020-10-15 17:14:30.896682+00
43	2020-10-16 17:25:38.025302+00
44	2020-10-16 20:17:26.60972+00
45	2020-10-21 19:28:35.558608+00
46	2020-10-22 21:19:09.501081+00
47	2020-10-23 18:27:36.79376+00
48	2020-10-25 00:38:25.942493+00
49	2020-10-26 18:29:29.498372+00
50	2020-10-27 18:09:26.86107+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	43	Michael	1234567897654321	2020 CarFax	2020-10-16 21:48:28.57689+00
2	44	Michael	1234567897654940	2121 CarFax	2020-10-16 21:51:16.095623+00
3	44	Lilly	123456789	5612 Learning Fuze ave	2020-10-16 22:02:38.171498+00
4	44	Mark	1234531	5612 Learning Fuze ave	2020-10-16 22:03:56.357051+00
5	44	Mark	12345317	3612 Learning Fuze ave	2020-10-16 22:08:05.983527+00
6	44	Mark	12345317	3612 Learning Fuze ave	2020-10-16 22:11:28.194865+00
7	48	Michael	1234567897654940	2121 CarFax	2020-10-25 01:33:29.459956+00
8	48	Michael	1234567897654940	2121 CarFax	2020-10-26 17:47:49.168925+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Puppy Starter Kit Chew Dog Toys - 3Pack 	2999	/images/puppy-starter-kit.jpeg	 Start your puppy out with healthy, approved chewing habits right from the beginning. Three different Nylabones are designed for different stages of your puppy's development.	Start your puppy out with healthy, approved chewing habits right from the beginning. Three different Nylabones are designed for different stages of your puppy's development. As a new puppy parent, part of your job is to encourage healthy chewing behaviors and to help your puppy learn which items can and cannot be chewed. This Nylabone Puppy Starter Kit offers three different Nylabones designed to complement varying stages of your puppy's development. Included are: one Puppy Bone, a more flexible, pliable bone designed to assist in the development of teeth and jaws in puppies 2 months and over; one Healthy Edibles Bacon Bone, a natural flavored edible chew that's an ideal alternative to processed rawhide or animal parts. Contains no salt, sugar or plastic and it's 100% edible and digestible. Healthy Edibles should be offered from 3 months on; and, one Durable Pooch Pacifier in Chicken flavor. This chew is designed for puppies 4 months and older, whose jaws are getting stronger and their chewing more aggressive. Each of these bones is non-toxic, vet-approved and measures 4.75"L.
3	Puppy Goodie Bone™ Treat Dispensing Puppy	2900	/images/puppy-goodie-bone.jpeg	The natural KONG Puppy soft teething rubber formula designed to soothe teeth and gums.	The KONG Puppy Goodie Bone engages puppies that are learning appropriate chewing behavior. Made from the KONG Classic unique puppy rubber, this bone fulfills instinctual needs to chew while easing aching teeth and gums. KONG Goodie Grippers turn this entertaining toy into a fun treat dispensing challenge. Want to extend chew sessions? Stuff with KONG Puppy Snacks and KONG Puppy Easy Treat. Covered by KONG Satisfaction Guarantee. See KONG Satisfaction Guarantee document below for full details.
4	Puppy Chew Dental Dog Bone	999	/images/puppy-chew-dental-dog-bone.jpeg	The Nylabone Puppy Dental Bones are made of softer materials for puppies.	Developing proper chewing habits is one of the best lessons your young pup can learn. Start them down the right path now with a chew they\\"ll love! The Nylabone Puppy Dental Bones are made of softer materials for puppies. They help puppies develop proper chewing habits, grow strong teeth and jaws.
6	Top Paw® Noodle Bobo Puppy Dog Toy - Plush, Squeaker	830	/images/noodle-bobo-puppy-dog-toy.jpeg	Keep your dog fully entertained at play time with this Top Paw Bobo Dog Toy.	It\\"s easy to see why the Loofa Dog has become such a big hit with canines everywhere: it\\"s great for fetching, tossing, and shaking! Each Loofa Dog Plush Toy includes an internal squeaker that amps up any game. You choose one of four sizes, and it ships in one of five colors at random. 
2	Puppy X Bone Dog Toy	2595	/images/puppy-x-bone-dog-toy.jpeg	Provide an easy-chewing, comfort-hold puppy chew toy that your little guy	Provide an easy-chewing, comfort-hold puppy chew toy that your little guy will enjoy sinking his teeth into with Nylabone/s Puppy Chew X Bone. Featuring a delicious beef flavor throughout, this chew toy comes with ridges and nubs that will help clean your pup/s teeth and massage gums.
5	Smart Pet Love Snuggle Puppy™ Behavioral Aid Dog Toy	9900	/images/smart-pet-love-snuggle-puppy.jpeg	Keep your dog fully entertained at play time with this Top Paw Bobo Dog Toy.	 Whether they\\"re new to the family, or perhaps just going through a tough time, the Smart Pet Love Snuggle Puppy is designed to provide comfort and helps relieve anxiety in your four-legged friend. Whatever the case, whether crate training, a new transition, fireworks, or perhaps a thunderstorm, rest assured the Snuggle Puppy will be there to help. Dogs and puppies are pack animals who are instinctively drawn to their mother and others in their pack. The Snuggle Puppy recreates the intimacy and physical warmth and a "\\real-feel\\" heartbeat. The result is a calmer, more peaceful pet- one that feels less loneliness, fear, and separation anxiety.\nThe "real-feel" pulsing heartbeat comes with 2 AAA batteries that last up to 2 weeks with continuous 24/7 use. The hearts on/off button allows for use when needed. Included with your Snuggle Puppy is one disposable warmer pack (non-toxic, safe for people and pets, each pack lasts 24 hours) for an extra source of comfort for your pet. The Snuggle Puppy is all natural, medication free, and not a restraint. It calms your pet by appealing to their basic natural instincts. It is also machine washable on a gentle cycle (make sure to remove the heartbeat prior to washing). 
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 144, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 50, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 8, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

