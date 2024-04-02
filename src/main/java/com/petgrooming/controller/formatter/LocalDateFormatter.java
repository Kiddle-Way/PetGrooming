package com.petgrooming.controller.formatter;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import org.springframework.format.Formatter;

//LocalDate 타입을 문자열로 포맷하고 문자열을 LocalDate 객체로 파싱하는 포매터 클래스입니다.
public class LocalDateFormatter implements Formatter<LocalDate> {
	@Override
	public String print(LocalDate object, Locale locale) {
		return DateTimeFormatter.ofPattern("yyyy-MM-dd").format(object);
	}

	@Override
	public LocalDate parse(String text, Locale locale) throws ParseException {
		return LocalDate.parse(text, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
	}
}