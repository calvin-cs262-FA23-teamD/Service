-- Get everything from theUser table.
SELECT *
FROM theUser
;

-- Get everything from clickTrack table.
SELECT *
FROM clickTrack
;

-- Get everything from Measure table.
SELECT *
FROM Measure
;

-- Get everything from Marker table.
SELECT *
FROM Marker
;

-- Get all of the measures of a specific click track in order
SELECT *
FROM Measure
WHERE clickTrackID =3
ORDER BY measureNum
;

--Get a specific measure from a specific click track
SELECT *
FROM Measure
WHERE measureNum = 1
AND clickTrackID = 2

-- get all of the click tracks of a sepcific user ordered by date
SELECT *
FROM clickTrack
WHERE userID = 1
ORDER BY date
;

-- get a list of users of a specific user
SELECT username
FROM theUser

-- get the password of a specific user
SELECT password
FROM theUser
WHERE userID = 3


