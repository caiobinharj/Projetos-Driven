-- Questão 01
SELECT * FROM companies LIMIT 5;

-- Questão 02
SELECT * FROM companies WHERE name = 'Driven'

-- Questão 03
INSERT INTO companies (name, image_url) VALUES ('Apple', 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg');

-- Questão 04
DELETE FROM companies WHERE name = 'Apple';

-- Questão 05
UPDATE companies SET name = 'Google' WHERE name = 'Gogle';

-- Questão 06
UPDATE jobs SET salary = '1500' WHERE salary = '1000';

-- Questão 07
INSERT INTO experiences (user_id, company_id, role_id, start_date, end_date)
VALUES (
    (SELECT id FROM users WHERE name = 'Kelly'),
    (SELECT id FROM companies WHERE name = 'Nubank'),
    (SELECT id FROM roles WHERE name = 'CTO'),
    '2024-09-19',
    NULL
);

-- Questão 08
DELETE FROM applicants
WHERE user_id = (SELECT users.id FROM users WHERE users.name = 'Kelly')
AND job_id = 
(SELECT jobs.id FROM jobs
JOIN companies ON company_id = companies.id
JOIN roles ON role_id = roles.id
WHERE companies.name = 'Carrefour'
AND roles.name = 'Engenheiro de Software Pleno');

-- Questão 09
SELECT id, description, salary FROM jobs ORDER BY salary DESC LIMIT 3;

-- Questão 10
SELECT jobs.id, companies.name, salary FROM jobs JOIN companies ON jobs.company_id = companies.id ORDER BY salary LIMIT 1;

-- Questão 11
SELECT users.id, users.name, cities.name AS city FROM users JOIN cities ON users.city_id = cities.id WHERE cities.name = 'Rio de Janeiro';

-- Questão 12
SELECT testimonials.id, message, writer.name as writer, recipient.name as recipient
FROM testimonials
JOIN users AS writer ON testimonials.writer_id = writer.id
JOIN users AS recipient ON testimonials.recipient_id = recipient.id;

-- Questão 13
SELECT users.name, courses.name as course, schools.name as schools, educations.end_date
FROM users 
JOIN educations ON users.id = educations.user_id
JOIN schools ON educations.school_id = schools.id
JOIN courses ON educations.course_id = courses.id
WHERE educations.status = 'finished'
AND users.id = 5;

-- Questão 14
SELECT users.id, users.name, roles.name as role, companies.name as company, experiences.start_date
FROM users
JOIN experiences ON users.id = experiences.user_id 
JOIN companies ON experiences.company_id = companies.id
JOIN roles ON experiences.role_id = roles.id
WHERE users.id = 10
AND experiences.end_date IS NOT NULL;


-- Questão 15
SELECT schools.id as id, schools.name as school, courses.name as course, companies.name as company, roles.name as roles
FROM users
JOIN applicants ON users.id = applicants.user_id
JOIN jobs ON applicants.job_id = jobs.id
JOIN companies ON jobs.company_id = companies.id
JOIN roles ON jobs.role_id = roles.id
JOIN educations ON users.id = educations.user_id
JOIN schools ON educations.school_id = schools.id
JOIN courses ON educations.course_id = courses.id
WHERE jobs.active = true
AND companies.id = 1
AND roles.name = 'Engenheiro de Software Pleno';

-- Questão 16
SELECT COUNT(end_date) FROM experiences;

-- Questão 17
SELECT users.id, users.name, COUNT(educations.status) FROM educations JOIN users ON educations.user_id = users.id GROUP BY users.name, users.id ORDER BY count DESC;

-- Questão 18
SELECT users.name AS writer, COUNT(*) AS testimonialCount FROM testimonials JOIN users ON testimonials.writer_id = users.id WHERE writer_id = 9 GROUP BY writer;

-- Questão 19
SELECT MAX(salary) AS maximum_salary, roles.name AS role
FROM jobs 
JOIN roles ON jobs.role_id = roles.id
GROUP BY roles.name
ORDER BY maximum_salary ASC;

-- Questão 20
SELECT schools.name AS school, courses.name AS course, COUNT(*) AS student_count
FROM educations
JOIN schools ON educations.school_id = schools.id
JOIN courses ON educations.course_id = courses.id
WHERE educations.status = 'finished'
GROUP BY school, course
ORDER BY student_count DESC
LIMIT 3;
