  <h1 align="center">MODULE-1-PART-3-gallery</h1>
   <h2 align="center">Александр Калиниченко</h2> 
<hr />
<h2> Discription</h2>
  <p style="text-indent: 25px;">Основной идеей проекта было создание галлереи картинок.
  В ходной точкой является файл index.html. 
  При запуске приложения сначала откроется форма авторизации. 
  Обработка авторизационных данных происходит в скрипте auth.js. 
  Получение данных с сервера и отрисовка изображений выполняется файлом get_gallery.js</p>

   <h4> Алгоритм работы auth.js</h4>
<p style="text-indent: 25px;">Выполнение кода, данного файла, начинается после нажатия пользователем кнопки "LogIn".
Данные введенные пользователем  передаются в функцию control_validation_authorization. 
Функция проверяет на корректность, введенных пользователем данных. Если валидация не пройдена, выдается ошибка и ожидается повторный ввод данных пользователем.
Если успешна запускается функция authorization. authorization посылает POST запрос на сервер. 
<br/>

При успешной авторизации сохраняется токен (function save_token). 
Если авторизация и валидация прошли успешно запускается фунция  hidden_auth_form, <strong style="color:green;">get_gallery</strong>,setTimeout(reset_gallery, time)
reset_gallery удаляет токен, выполняет функцию remove_gallery(для удаления изображений) и show_auth_form(показывает пользователю окно авторизции)</p>

 <h4>Алгоритм работы get_gallery.js</h4>
 <p style="text-indent: 25px;">Скрипт реагирует на успешную авторизацию и нажатие кнопок Next и Back (данные элементы отвечают за перемещение пользователя между страницами галлереи) 
Функция get_gallery получает токен из localStorage ,посылает GET запрос, запускает функцию create_gallery
create_gallery очищает галлерею(function clear_gallery), затем создает новые элементы (function create_img)
</p>

<h1>About project</h1>
<hr/>
Структура проекта:
<ul>
<li>authorization
<ul><li>auth.js</li></ul></li>
<li>css
<ul><li>style.css</li></ul></li>
<li>gallery
<ul><li>get_gallery.js</li></ul></li>
<li>index.html</li>
<li>.gitignore</li>
<li>README.md</li>
</ul>