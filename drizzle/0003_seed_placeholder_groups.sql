-- The test Groups that used to live in src/data/clubs.json, owned by the "site-admin" placeholder.
-- created_at is staggered so they keep their old order on the Groups page.
INSERT INTO "groups" ("id", "name", "sport", "city", "state", "country", "description", "tags", "links", "owner_id", "created_at") VALUES
(
	'old-goat-track-club',
	'Old Goat Track Club',
	'Running',
	'Waltham',
	'MA',
	'USA',
	'Our home base for former college runners and competitors who traded the eligibility clock for the open road: workouts, races, and a crew that still shows up early.',
	ARRAY['distance running', 'masters', 'road racing', 'track and field', 'cross country'],
	'[{"label": "Website", "url": "https://ogtc.net/index.html"}]'::jsonb,
	'site-admin',
	'2026-01-01T00:00:00Z'
),
(
	'charles-river-masters-rowing',
	'Charles River Masters Rowing',
	'Rowing',
	'Boston',
	'MA',
	'USA',
	'Early-morning sculling and sweep sessions for ex-collegiate rowers who miss the 5 a.m. alarm more than they admit.',
	ARRAY['masters', 'sculling', 'sweep', 'head races'],
	'[{"label": "Website", "url": "https://example.com/charles-river-masters-rowing"}]'::jsonb,
	'site-admin',
	'2026-01-01T00:00:01Z'
),
(
	'bay-state-gravel-collective',
	'Bay State Gravel Collective',
	'Cycling',
	'Worcester',
	'MA',
	'USA',
	'Weekend gravel rides and fall cyclocross for former athletes who found a new engine on two wheels.',
	ARRAY['gravel', 'cyclocross', 'group rides'],
	'[{"label": "Website", "url": "https://example.com/bay-state-gravel-collective"}]'::jsonb,
	'site-admin',
	'2026-01-01T00:00:02Z'
)
ON CONFLICT ("id") DO NOTHING;
