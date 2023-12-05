-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.
DROP TABLE IF EXISTS theUser CASCADE;
DROP TABLE IF EXISTS clickTrack CASCADE;
DROP TABLE IF EXISTS Measure CASCADE;
DROP TABLE IF EXISTS Marker CASCADE;

-- Create the schema.
CREATE TABLE theUser (
    ID SERIAL PRIMARY KEY,
    username varchar(50) NOT NULL,
    password varchar(50) NOT NULL
);

CREATE TABLE clickTrack (
    ID SERIAL PRIMARY KEY,
    userID integer REFERENCES theUser(ID),
    name varchar(50) NOT NULL,
    date date
);

CREATE TABLE Measure (
    ID SERIAL PRIMARY KEY,
    clickTrackID integer REFERENCES clickTrack(ID),

    -- Can't put MarkerID in here because it would require Marker to be created first; however,
    -- Marker requires that measure be made frist to get its ID.

    measureNum integer,
    timeSig integer, 
    -- if we do 3/4 it would contain the number of beats and quarter notes and the like
    
    tempo integer,
    sound varchar(50) NOT NULL
    -- number of beats ?
);

CREATE TABLE Marker (
    ID SERIAL PRIMARY KEY,
    clickTrackID integer REFERENCES clickTrack(ID),
    name varchar(50) NOT NULL
    -- add a var for the number of measures covered?
);

-- Allow users to select data from the tables.
GRANT SELECT ON theUser TO PUBLIC;
GRANT SELECT ON clickTrack TO PUBLIC;
GRANT SELECT ON Measure TO PUBLIC;
GRANT SELECT ON Marker TO PUBLIC;

-- Add test records.
INSERT INTO theUser VALUES (0, 'Caden', 'Joshua');
INSERT INTO theUser VALUES (1, 'Lexi', 'Joshua');
INSERT INTO theUser VALUES (2, 'Abigail', 'Joshua');
INSERT INTO theUser VALUES (3, 'Emma', 'Joshua');

INSERT INTO clickTrack VALUES (0, 0, 'The Devil Went Down To Georgia', '1979-01-01');
INSERT INTO clickTrack VALUES (1, 1, 'Amazing Grace', '1772-01-01');
INSERT INTO clickTrack VALUES (2, 2, 'How Great Thou Art', '1885-01-01');
INSERT INTO clickTrack VALUES (3, 3, 'Holy, Holy, Holy', '1826-01-01');
INSERT INTO clickTrack VALUES (4, 1, 'When Peace Like a River', '1874-01-01');

INSERT INTO Measure VALUES (0, 0, 1, 4, 160, 'shotgun');
INSERT INTO Measure VALUES (1, 1, 1, 3, 120, 'clap');
INSERT INTO Measure VALUES (2, 2, 1, 2, 80, 'snap');
INSERT INTO Measure VALUES (3, 3, 1, 1, 40, 'piano');
INSERT INTO Measure VALUES (4, 3, 2, 1, 40, 'piano');
INSERT INTO Measure VALUES (5, 3, 4, 1, 40, 'snap');
INSERT INTO Measure VALUES (6, 3, 3, 1, 40, 'piano');


INSERT INTO Marker VALUES (0, 0, 'Fiddle Part');
INSERT INTO Marker VALUES (1, 1, 'Amazing Part');
INSERT INTO Marker VALUES (2, 2, 'Great Part');
INSERT INTO Marker VALUES (3, 3, 'Holy Part');

DROP TABLE IF EXISTS theUser CASCADE;
DROP TABLE IF EXISTS clickTrack CASCADE;
DROP TABLE IF EXISTS Measure CASCADE;
DROP TABLE IF EXISTS Marker CASCADE;

-- Create the schema.
CREATE TABLE theUser (
    ID SERIAL PRIMARY KEY,
    username varchar(50) NOT NULL,
    password varchar(50) NOT NULL
);

CREATE TABLE clickTrack (
    ID SERIAL PRIMARY KEY,
    userID integer REFERENCES theUser(ID),
    name varchar(50) NOT NULL,
    date date
);

CREATE TABLE Measure (
    ID SERIAL PRIMARY KEY,
    clickTrackID integer REFERENCES clickTrack(ID),

    -- Can't put MarkerID in here because it would require Marker to be created first; however,
    -- Marker requires that measure be made frist to get its ID.

    measureNum integer,
    timeSig integer, 
    -- if we do 3/4 it would contain the number of beats and quarter notes and the like
    
    tempo integer,
    sound varchar(50) NOT NULL
    -- number of beats ?
);

CREATE TABLE Marker (
    ID SERIAL PRIMARY KEY,
    clickTrackID integer REFERENCES clickTrack(ID),
    name varchar(50) NOT NULL
    -- add a var for the number of measures covered?
);

-- Allow users to select data from the tables.
GRANT SELECT ON theUser TO PUBLIC;
GRANT SELECT ON clickTrack TO PUBLIC;
GRANT SELECT ON Measure TO PUBLIC;
GRANT SELECT ON Marker TO PUBLIC;

-- Add test records.
INSERT INTO theUser VALUES (0, 'Caden', 'Joshua');
INSERT INTO theUser VALUES (1, 'Lexi', 'Joshua');
INSERT INTO theUser VALUES (2, 'Abigail', 'Joshua');
INSERT INTO theUser VALUES (3, 'Emma', 'Joshua');

INSERT INTO clickTrack VALUES (0, 0, 'The Devil Went Down To Georgia', '1979-01-01');
INSERT INTO clickTrack VALUES (1, 1, 'Amazing Grace', '1772-01-01');
INSERT INTO clickTrack VALUES (2, 2, 'How Great Thou Art', '1885-01-01');
INSERT INTO clickTrack VALUES (3, 3, 'Holy, Holy, Holy', '1826-01-01');
INSERT INTO clickTrack VALUES (4, 1, 'When Peace Like a River', '1874-01-01');

INSERT INTO Measure VALUES (0, 0, 1, 4, 160, 'shotgun');
INSERT INTO Measure VALUES (1, 1, 1, 3, 120, 'clap');
INSERT INTO Measure VALUES (2, 2, 1, 2, 80, 'snap');
INSERT INTO Measure VALUES (3, 3, 1, 1, 40, 'piano');
INSERT INTO Measure VALUES (4, 3, 2, 1, 40, 'piano');
INSERT INTO Measure VALUES (5, 3, 4, 1, 40, 'snap');
INSERT INTO Measure VALUES (6, 3, 3, 1, 40, 'piano');


INSERT INTO Marker VALUES (0, 0, 'Fiddle Part');
INSERT INTO Marker VALUES (1, 1, 'Amazing Part');
INSERT INTO Marker VALUES (2, 2, 'Great Part');
INSERT INTO Marker VALUES (3, 3, 'Holy Part');