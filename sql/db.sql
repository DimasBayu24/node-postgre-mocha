-- Import query to DB

DROP TABLE IF EXISTS kurs;
DROP TABLE IF EXISTS mata_uang;

CREATE TABLE mata_uang(
   mata_uang_id INT GENERATED ALWAYS AS IDENTITY,
   jenis_mata_uang VARCHAR(255) NOT NULL,
   PRIMARY KEY(mata_uang_id)
);

CREATE TABLE kurs(
   kurs_id INT GENERATED ALWAYS AS IDENTITY,
   e_rate_beli VARCHAR(255) NOT NULL,
   e_rate_jual VARCHAR(255) NOT NULL,
   tt_counter_beli VARCHAR(255) NOT NULL,
   tt_counter_jual VARCHAR(255) NOT NULL,
   bank_notes_beli VARCHAR(255) NOT NULL,
   bank_notes_jual VARCHAR(255) NOT NULL,
   updated_time DATE NOT NULL,
    mata_uang_id INT,
   PRIMARY KEY(kurs_id),
   CONSTRAINT fk_mata_uang
      FOREIGN KEY(mata_uang_id) 
	  REFERENCES mata_uang(mata_uang_id)
	  ON DELETE SET NULL
);

INSERT INTO mata_uang(jenis_mata_uang)
VALUES('USD'),
      ('SGD'),
      ('EUR'),
      ('AUD'),
      ('DKK'),
      ('SEK'),
      ('CAD'),
      ('CHF'),
      ('NZD'),
      ('GBP'),
      ('HKD'),
      ('JPY'),
      ('SAR'),
      ('CNH'),
      ('MYR'),
      ('THB');
	   
	   
INSERT INTO kurs(mata_uang_id, e_rate_beli, e_rate_jual, tt_counter_beli, tt_counter_jual, bank_notes_beli, bank_notes_jual, updated_time)
VALUES(1, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(2, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(3, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(4, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(5, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(6, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(7, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(8, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(9, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(10, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(11, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(12, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(13, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(14, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(15, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09'),
(16, 14521, 14536, 14379, 14679, 14409, 14709, '2021-07-09');