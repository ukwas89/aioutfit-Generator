<?php
/*
Plugin Name: AI Outfit Generator
Description: AI-powered outfit generator React application
Version: 1.0
Author: Your Name
*/

// Prevent direct access to this file
if (!defined('ABSPATH')) {
    exit;
}

function outfit_generator_shortcode() {
    // Get the plugin directory URL
    $plugin_url = plugin_dir_url(__FILE__);
    
    // Enqueue the built assets
    wp_enqueue_style('outfit-generator-styles', $plugin_url . 'dist/assets/index.css');
    wp_enqueue_script('outfit-generator-js', $plugin_url . 'dist/assets/index.js', array(), '1.0', true);
    
    // Return the container div where React will mount
    return '<div id="root"></div>';
}

// Register the shortcode
add_shortcode('outfit_generator', 'outfit_generator_shortcode');

// Add menu item to WordPress admin
function outfit_generator_menu() {
    add_menu_page(
        'AI Outfit Generator',
        'Outfit Generator',
        'manage_options',
        'outfit-generator',
        'outfit_generator_admin_page',
        'dashicons-admin-customizer'
    );
}
add_action('admin_menu', 'outfit_generator_menu');

// Admin page content
function outfit_generator_admin_page() {
    ?>
    <div class="wrap">
        <h1>AI Outfit Generator</h1>
        <p>Use this shortcode to add the outfit generator to any page or post:</p>
        <code>[outfit_generator]</code>
    </div>
    <?php
}