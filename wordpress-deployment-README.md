# WordPress Deployment Instructions

Follow these steps to deploy the AI Outfit Generator on your WordPress website:

1. Build the React application:
   ```bash
   npm run build
   ```

2. Create a new directory in your WordPress plugins folder:
   ```bash
   wp-content/plugins/ai-outfit-generator/
   ```

3. Copy the following files/directories to the plugin directory:
   - Copy the entire `dist` folder
   - Copy the `wordpress-plugin/ai-outfit-generator.php` file

4. Log in to your WordPress admin panel and activate the "AI Outfit Generator" plugin.

5. Add the outfit generator to any page or post using the shortcode:
   ```
   [outfit_generator]
   ```

## Important Notes:
- Ensure your WordPress server has sufficient PHP memory limit
- The plugin requires WordPress 5.0 or higher
- Make sure your theme supports shortcodes
- If you update the React application, remember to rebuild and replace the dist folder

## Troubleshooting:
- If styles are not loading, check if your theme's CSS is conflicting
- Ensure JavaScript is enabled in the browser
- Check the browser console for any errors
- Verify that the shortcode is properly placed in your WordPress content

For support or issues, please refer to the documentation or contact support.