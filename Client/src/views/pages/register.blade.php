
<form class="" action="index.html" method="post">
    
    <input type="text" name="name" value="">
    <br>
    <input type="text" name="email" value="">
    <br>
    <input type="password" name="password" value="">
    <br>
    <input type="text" name="_token" value="{{crsf_token()}}">
    <br>
    <button type="submit" name="button">register</button>
</form>
