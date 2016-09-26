# SplashKit Server Playground

Electron application for viewing GET and POST requests.

## Sample student code

```cpp
int main()
{
    open_window("Downloaded Resources", 800, 400);
    clear_screen();
    download_image("SKLogo", "http://localhost/splashkit.png", 8080);
    draw_bitmap("SKLogo", 100, 100);
    refresh_screen();
    delay(1000);
    download_sound_effect("Boom", "http://localhost/boom.wav", 8080);
    play_sound_effect("Boom");
    delay(1000);
    http_post("http://localhost/data", 8080, "Posting this online... here goes!");
    draw_text("Sent message to server!", COLOR_BLACK, 100, 300);
    delay(2000);
    return 0;
}
```
