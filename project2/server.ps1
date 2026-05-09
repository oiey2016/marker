$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Start()
Write-Host 'Server started at http://localhost:8080'

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($localPath) -or $localPath -eq '/') {
        $localPath = 'index.html'
    }
    
    $filePath = Join-Path (Get-Location) $localPath
    
    if (Test-Path $filePath) {
        $extension = [System.IO.Path]::GetExtension($filePath)
        $contentTypes = @{
            '.html' = 'text/html; charset=utf-8'
            '.css' = 'text/css; charset=utf-8'
            '.js' = 'application/javascript; charset=utf-8'
            '.json' = 'application/json; charset=utf-8'
        }
        
        if ($contentTypes.ContainsKey($extension)) {
            $response.ContentType = $contentTypes[$extension]
        }
        
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
    }
    
    $response.Close()
}
