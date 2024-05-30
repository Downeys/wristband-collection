CREATE SCHEMA IF NOT EXISTS track_data;
CREATE SCHEMA IF NOT EXISTS tracks;

CREATE TABLE IF NOT EXISTS track_data.audio_metadata (
    audio_metadata_id UUID DEFAULT gen_random_uuid(),
    audio_url_address TEXT
);

ALTER TABLE IF EXISTS track_data.audio_metadata
ADD CONSTRAINT audio_metadata_pkey PRIMARY KEY (audio_metadata_id);

CREATE TABLE IF NOT EXISTS track_data.picture_metadata (
    picture_metadata_id UUID DEFAULT gen_random_uuid(),
    picture_url_address TEXT
)

ALTER TABLE IF EXISTS track_data.picture_metadata
ADD CONSTRAINT picture_metadata_pkey PRIMARY KEY (picture_metadata_id);

CREATE TABLE IF NOT EXISTS track_data.track_config (
    track_config_id UUID DEFAULT gen_random_uuid(),
    audio_metadata_id UUID,
    picture_metadata_id UUID,
    track_name TEXT,
    band_name TEXT
)

ALTER TABLE IF EXISTS track_data.track_config
ADD CONSTRAINT track_config_pkey PRIMARY KEY (track_config_id);

ALTER TABLE IF EXISTS track_data.track_config
ADD CONSTRAINT audio_metadata_fkey foreign key (audio_metadata_id) references audio_metadata(audio_metadata_id);

ALTER TABLE IF EXISTS track_data.track_config
ADD CONSTRAINT picture_metadata_fkey foreign key (picture_metadata_id) references picture_metadata(picture_metadata_id);

CREATE VIEW IF NOT EXISTS tracks.track AS
SELECT
    tdtc.track_config_id,
    tdtc.track_name,
    tdtc.band_name,
    tdam.audio_url_address,
    tdpm.picture_url_address
FROM track_data.track_config tdtc
JOIN track_data.audio_metadata tdam ON tdam.audio_metadata_id = tdtc.audio_metadata_id
JOIN track_data.picture_metadata tdpm ON tdpm.picture_metadata_id = tdpm.picture_metadata_id;
