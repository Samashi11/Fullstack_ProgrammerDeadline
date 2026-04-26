drop extension if exists "pg_net";

create extension if not exists "vector" with schema "public";


  create table "public"."document_chunks" (
    "id" uuid not null default gen_random_uuid(),
    "document_id" uuid not null,
    "content" text not null,
    "embedding" public.vector(768),
    "metadata" jsonb default '{}'::jsonb
      );



  create table "public"."documents" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "title" text not null,
    "file_name" text not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now())
      );



  create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "email" text not null,
    "password_hash" text not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now())
      );


CREATE INDEX document_chunks_embedding_idx ON public.document_chunks USING hnsw (embedding public.vector_cosine_ops);

CREATE UNIQUE INDEX document_chunks_pkey ON public.document_chunks USING btree (id);

CREATE UNIQUE INDEX documents_pkey ON public.documents USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

alter table "public"."document_chunks" add constraint "document_chunks_pkey" PRIMARY KEY using index "document_chunks_pkey";

alter table "public"."documents" add constraint "documents_pkey" PRIMARY KEY using index "documents_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

alter table "public"."document_chunks" add constraint "document_chunks_document_id_fkey" FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE not valid;

alter table "public"."document_chunks" validate constraint "document_chunks_document_id_fkey";

alter table "public"."documents" add constraint "documents_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."documents" validate constraint "documents_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.match_document_chunks(query_embedding public.vector, match_count integer DEFAULT 5, p_user_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(id uuid, document_id uuid, content text, metadata jsonb, similarity double precision)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    dc.id,
    dc.document_id,
    dc.content,
    dc.metadata,
    1 - (dc.embedding <=> query_embedding) AS similarity
  FROM public.document_chunks dc
  JOIN public.documents d ON dc.document_id = d.id
  WHERE d.user_id = p_user_id -- Memastikan hanya mencari di dokumen milik user tersebut
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
END;
$function$
;

grant delete on table "public"."document_chunks" to "anon";

grant insert on table "public"."document_chunks" to "anon";

grant references on table "public"."document_chunks" to "anon";

grant select on table "public"."document_chunks" to "anon";

grant trigger on table "public"."document_chunks" to "anon";

grant truncate on table "public"."document_chunks" to "anon";

grant update on table "public"."document_chunks" to "anon";

grant delete on table "public"."document_chunks" to "authenticated";

grant insert on table "public"."document_chunks" to "authenticated";

grant references on table "public"."document_chunks" to "authenticated";

grant select on table "public"."document_chunks" to "authenticated";

grant trigger on table "public"."document_chunks" to "authenticated";

grant truncate on table "public"."document_chunks" to "authenticated";

grant update on table "public"."document_chunks" to "authenticated";

grant delete on table "public"."document_chunks" to "service_role";

grant insert on table "public"."document_chunks" to "service_role";

grant references on table "public"."document_chunks" to "service_role";

grant select on table "public"."document_chunks" to "service_role";

grant trigger on table "public"."document_chunks" to "service_role";

grant truncate on table "public"."document_chunks" to "service_role";

grant update on table "public"."document_chunks" to "service_role";

grant delete on table "public"."documents" to "anon";

grant insert on table "public"."documents" to "anon";

grant references on table "public"."documents" to "anon";

grant select on table "public"."documents" to "anon";

grant trigger on table "public"."documents" to "anon";

grant truncate on table "public"."documents" to "anon";

grant update on table "public"."documents" to "anon";

grant delete on table "public"."documents" to "authenticated";

grant insert on table "public"."documents" to "authenticated";

grant references on table "public"."documents" to "authenticated";

grant select on table "public"."documents" to "authenticated";

grant trigger on table "public"."documents" to "authenticated";

grant truncate on table "public"."documents" to "authenticated";

grant update on table "public"."documents" to "authenticated";

grant delete on table "public"."documents" to "service_role";

grant insert on table "public"."documents" to "service_role";

grant references on table "public"."documents" to "service_role";

grant select on table "public"."documents" to "service_role";

grant trigger on table "public"."documents" to "service_role";

grant truncate on table "public"."documents" to "service_role";

grant update on table "public"."documents" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


