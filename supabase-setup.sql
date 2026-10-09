-- Run this once in your Supabase project's SQL Editor.
-- Your browser uses only the publishable/anon key; table writes are disabled.
create table if not exists public.dadi_scores (
 id uuid primary key,
 player_name text not null check (char_length(player_name) between 1 and 60),
 relationship text not null check (char_length(relationship) between 1 and 60),
 score integer not null check(score between 0 and 20),
 total integer not null default 20,
 quiz_version text not null default 'tara-v1',
 created_at timestamptz not null default now()
);
create index if not exists dadi_scores_ranking on public.dadi_scores (quiz_version,score desc,created_at);
alter table public.dadi_scores enable row level security;
revoke all on public.dadi_scores from anon, authenticated;

create or replace function public.submit_dadi_score(
 p_id uuid,p_name text,p_relationship text,p_answers jsonb,p_version text
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
 expected integer[] := array[2,0,1,2,1,3,1,2,2,3,0,0,1,2,2,1,1,2,1,1];
 result integer := 0;
 answer integer;
 i integer;
 entry public.dadi_scores%rowtype;
begin
 if p_version is distinct from 'tara-v1' then raise exception 'Unknown quiz version'; end if;
 if p_name is null or p_relationship is null or char_length(btrim(p_name)) not between 1 and 60 or char_length(btrim(p_relationship)) not between 1 and 60 then raise exception 'Invalid name or relationship'; end if;
 if p_id is null then raise exception 'Missing attempt id'; end if;
 if p_answers is null or jsonb_typeof(p_answers) is distinct from 'array' then raise exception 'Invalid answers'; end if;
 if jsonb_array_length(p_answers) <> 20 then raise exception 'Answer every question'; end if;
 for i in 0..19 loop
  if jsonb_typeof(p_answers->i) is distinct from 'number' or (p_answers->>i) !~ '^[0-3]$' then raise exception 'Invalid answer'; end if;
  answer := (p_answers->>i)::integer;
  if answer = expected[i+1] then result := result+1; end if;
 end loop;
 insert into public.dadi_scores(id,player_name,relationship,score,total,quiz_version) values(p_id,btrim(p_name),btrim(p_relationship),result,20,p_version) on conflict (id) do nothing;
 select * into entry from public.dadi_scores where id=p_id;
 return jsonb_build_object('id',entry.id,'player_name',entry.player_name,'relationship',entry.relationship,'score',entry.score,'total',entry.total);
end;
$$;

create or replace function public.dadi_leaderboard(p_version text)
returns table(id uuid,player_name text,relationship text,score integer,total integer)
language sql stable security definer set search_path = '' as $$
 select id,player_name,relationship,score,total from public.dadi_scores where quiz_version=p_version order by score desc,created_at asc limit 100;
$$;
revoke all on function public.submit_dadi_score(uuid,text,text,jsonb,text) from public;
revoke all on function public.dadi_leaderboard(text) from public;
grant execute on function public.submit_dadi_score(uuid,text,text,jsonb,text) to anon,authenticated;
grant execute on function public.dadi_leaderboard(text) to anon,authenticated;
