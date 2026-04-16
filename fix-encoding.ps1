# Fix mojibake in AYO Pilates project files
$htmlPath = "c:\repositórios\ayo-estudio\ayo-landing\src\app\app.html"
$cssPath  = "c:\repositórios\ayo-estudio\ayo-landing\src\app\app.css"

function FixMojibake($filePath) {
    $text = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
    $fixes = [ordered]@{
        "localizaÃ§Ã£o"    = "localização"
        "AYÃ"             = "AYÓ"
        "espaÃ§o"          = "espaço"
        "ConheÃ§a"         = "Conheça"
        "FaÃ§a"            = "Faça"
        "vocÃª"            = "você"
        "jÃ¡"              = "já"
        "experiÃªncias"    = "experiências"
        "vÃ¡"              = "vá"
        "atÃ©"             = "até"
        "horÃ¡rios"        = "horários"
        "HorÃ¡rio"         = "Horário"
        "SÃ¡bados"         = "Sábados"
        "PrÃ³xima"         = "Próxima"
        "VIVÃ"             = "VIVÁ"
        "CafÃ©"            = "Café"
        "DisponÃ­vel"      = "Disponível"
        "cabeÃ§alho"       = "cabeçalho"
        "Ã©"               = "é"
        "fÃ¡cil"           = "fácil"
        "Ã¢â‚¬â€""          = "→"
        "â€""              = "—"
        "â€™"              = "'"
        "Â©"               = "©"
        "Ã¢â‚¬Â"           = "'"
        "âœ""              = "✓"
        "Â·"               = "·"
    }
    foreach ($k in $fixes.Keys) {
        $text = $text.Replace($k, $fixes[$k])
    }
    [System.IO.File]::WriteAllText($filePath, $text, (New-Object System.Text.UTF8Encoding $false))
    Write-Host "Fixed: $filePath"
}

FixMojibake $htmlPath
FixMojibake $cssPath
Write-Host "DONE"
