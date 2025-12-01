# Fix all paths from absolute (/) to relative

# Fix index.html
$content = Get-Content "index.html" -Raw -Encoding UTF8
$content = $content -replace 'src="/images/', 'src="images/'
$content = $content -replace 'href="/typologies/', 'href="typologies/'
$content = $content -replace 'src="/js/', 'src="js/'
$content = $content -replace 'url\(/images/', 'url(images/'
Set-Content "index.html" -Value $content -Encoding UTF8

# Fix policies.html
$content = Get-Content "policies.html" -Raw -Encoding UTF8
$content = $content -replace '="/css/', '="css/'
$content = $content -replace '="/js/', '="js/'
$content = $content -replace '="/images/', '="images/'
$content = $content -replace '="/partials/', '="partials/'
Set-Content "policies.html" -Value $content -Encoding UTF8

# Fix 404.html  
$content = Get-Content "404.html" -Raw -Encoding UTF8
$content = $content -replace '="/css/', '="css/'
$content = $content -replace '="/js/', '="js/'
$content = $content -replace 'href="/index\.html"', 'href="index.html"'
Set-Content "404.html" -Value $content -Encoding UTF8

# Fix partials
Get-ChildItem "partials\*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content = $content -replace '="/', '="'
    Set-Content $_.FullName -Value $content -Encoding UTF8
}

# Fix typologies folder
Get-ChildItem "typologies\*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content = $content -replace '="/css/', '="../css/'
    $content = $content -replace '="/js/', '="../js/'  
    $content = $content -replace '="/images/', '="../images/'
    $content = $content -replace '="/partials/', '="../partials/'
    $content = $content -replace 'href="/index\.html"', 'href="../index.html"'
    $content = $content -replace 'href="/about-us/', 'href="../about-us/'
    $content = $content -replace 'href="/blog/', 'href="../blog/'
    $content = $content -replace 'href="/policies\.html"', 'href="../policies.html"'
    $content = $content -replace 'href="/typologies/', 'href="'
    $content = $content -replace 'href="/user/', 'href="../user/'
    $content = $content -replace 'href="/wishlist-and-payment/', 'href="../wishlist-and-payment/'
    $content = $content -replace 'href="/404\.html"', 'href="../404.html"'
    $content = $content -replace 'url\(/images/', 'url(../images/'
    Set-Content $_.FullName -Value $content -Encoding UTF8
}

# Fix blog folder
Get-ChildItem "blog\*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content = $content -replace '="/css/', '="../css/'
    $content = $content -replace '="/js/', '="../js/'
    $content = $content -replace '="/images/', '="../images/'
    $content = $content -replace '="/partials/', '="../partials/'
    $content = $content -replace 'href="/index\.html"', 'href="../index.html"'
    $content = $content -replace 'href="/about-us/', 'href="../about-us/'
    $content = $content -replace 'href="/blog/', 'href="'
    $content = $content -replace 'href="/policies\.html"', 'href="../policies.html"'
    $content = $content -replace 'href="/typologies/', 'href="../typologies/'
    $content = $content -replace 'href="/user/', 'href="../user/'
    $content = $content -replace 'href="/wishlist-and-payment/', 'href="../wishlist-and-payment/'
    Set-Content $_.FullName -Value $content -Encoding UTF8
}

# Fix about-us folder
Get-ChildItem "about-us\*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content = $content -replace '="/css/', '="../css/'
    $content = $content -replace '="/js/', '="../js/'
    $content = $content -replace '="/images/', '="../images/'
    $content = $content -replace '="/partials/', '="../partials/'
    $content = $content -replace 'href="/index\.html"', 'href="../index.html"'
    $content = $content -replace 'href="/about-us/', 'href="'
    $content = $content -replace 'href="/blog/', 'href="../blog/'
    $content = $content -replace 'href="/policies\.html"', 'href="../policies.html"'
    $content = $content -replace 'href="/typologies/', 'href="../typologies/'
    $content = $content -replace 'href="/user/', 'href="../user/'
    $content = $content -replace 'href="/wishlist-and-payment/', 'href="../wishlist-and-payment/'
    $content = $content -replace 'href="/404\.html"', 'href="../404.html"'
    Set-Content $_.FullName -Value $content -Encoding UTF8
}

# Fix user folder
Get-ChildItem "user\*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content = $content -replace '="/css/', '="../css/'
    $content = $content -replace '="/js/', '="../js/'
    $content = $content -replace '="/images/', '="../images/'
    $content = $content -replace '="/partials/', '="../partials/'
    $content = $content -replace 'href="/index\.html"', 'href="../index.html"'
    $content = $content -replace 'href="/about-us/', 'href="../about-us/'
    $content = $content -replace 'href="/blog/', 'href="../blog/'
    $content = $content -replace 'href="/policies\.html"', 'href="../policies.html"'
    $content = $content -replace 'href="/typologies/', 'href="../typologies/'
    $content = $content -replace 'href="/user/', 'href="'
    $content = $content -replace 'href="/wishlist-and-payment/', 'href="../wishlist-and-payment/'
    $content = $content -replace 'href="/404\.html"', 'href="../404.html"'
    Set-Content $_.FullName -Value $content -Encoding UTF8
}

# Fix wishlist-and-payment folder
Get-ChildItem "wishlist-and-payment\*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content = $content -replace '="/css/', '="../css/'
    $content = $content -replace '="/js/', '="../js/'
    $content = $content -replace '="/images/', '="../images/'
    $content = $content -replace '="/partials/', '="../partials/'
    $content = $content -replace 'href="/index\.html"', 'href="../index.html"'
    $content = $content -replace 'href="/about-us/', 'href="../about-us/'
    $content = $content -replace 'href="/blog/', 'href="../blog/'
    $content = $content -replace 'href="/policies\.html"', 'href="../policies.html"'
    $content = $content -replace 'href="/typologies/', 'href="../typologies/'
    $content = $content -replace 'href="/user/', 'href="../user/'
    $content = $content -replace 'href="/wishlist-and-payment/', 'href="'
    $content = $content -replace 'href="/404\.html"', 'href="../404.html"'
    $content = $content -replace 'url\(/images/', 'url(../images/'
    Set-Content $_.FullName -Value $content -Encoding UTF8
}

# Fix common.js
$content = Get-Content "js\common.js" -Raw -Encoding UTF8
$content = $content -replace "'/user/personal-info\.html'", "'../user/personal-info.html'"
$content = $content -replace "'/user/login\.html'", "'../user/login.html'"
Set-Content "js\common.js" -Value $content -Encoding UTF8

# Fix lang-change.js
$content = Get-Content "js\lang-change.js" -Raw -Encoding UTF8
$content = $content -replace "'/json-lang/", "'../json-lang/"
Set-Content "js\lang-change.js" -Value $content -Encoding UTF8

Write-Host "Done! All paths have been converted from absolute to relative." -ForegroundColor Green
