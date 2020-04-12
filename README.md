# Wawsuit--The_Lawsuits_App
#### Иван Гаџовски, 171095
Семинарска по предметот веб програмирање, ФИНКИ, зимски семестар 2019/2020


### Тема
Целта на оваа семинарска е изработка на апликација која би го олеснила следењето на сите судски постапки кои се водат во рамките на 
некоја компанија, нејзината намена е да биде користена од правните лица и нивните раководители во компанијата. 

Моделот е замислен така што секоја правна постапка е можно да има максимум 2 „подпостапки" во зависност од тоа до кој суд е стигната 
истата (основен, апелационен или врховен) при што двете подпостапки се водат како нови правни постапки - од апелационен или врховен суд 
соодветно (parent-child модел).

Секој корисник може да направи свој профил на апликацијата каде избира улога - правно лице или пак раководител. На почетната страна се
прикажани информациите за профилот на корисникот и има можност за промена на истите, како и можност за промена на корисничкото име и
лозинката.
Во табот „cases" корисникот може да ја види состојбата на сите тековни правни постапки (број, име, вредност, тужител, тужен...).
Секоја правна постапка може да биде модифицирана или пак истата може да биде избришана во делот „actions". При клик на dropdown менито
се прикажуваат сите подпостапки кои соодвествуваат на истата.
Во делот „Employees on this case" од соодветната постапка може да се видат сите вработени кои работат на постапката, има можност за нивно 
остранување од истата и можност за додавање нови вработени (претходно мора да се регистрирани на апликацијата). „Documents" ги означува
сите документи кои произлегуваат од судовите или од компанијата кои се однесуваат на постапката, како и функционалност за додавање нов
документ или пак промена на истиот и податоците кои се поврзани со него. 
Табот „all employees" ги прикажува сите вработени и на кои постапки работат, „all lawsuit entities" се однесува на сите правни субјекти
(тужители/тужени) кои биле регистрирани во апликацијата.

### Користени технологии
Spring Boot, React JS и MySQL

### Стартување на апликацијата
Команда за стартување: npm start
