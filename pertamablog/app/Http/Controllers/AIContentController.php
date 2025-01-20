<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Illuminate\Support\Facades\Log;

class AIContentController extends Controller
{
    public function generateContent(Request $request)
    {
        // Set max execution time to 10 minutes (600 seconds)
        set_time_limit(600);  // 600 seconds = 10 minutes
    
        $request->validate([
            'topic' => 'required|string|max:255',
        ]);
    
        $topic = $request->input('topic');
    
        // Point to the Python executable in the virtual environment
        $pythonPath = 'C:\\Users\\User\\gpt4all_env\\Scripts\\python.exe';  // Virtual environment Python path
        $pythonScript = base_path('scripts\\gpt4all_content_generator.py');
    
        // Set environment variables including HOME directory and PYTHONPATH
        $env = [
            'HOME' => 'C:\\Users\\User',  // Explicitly set the HOME directory
            'PYTHONPATH' => 'C:\\Users\\User\\gpt4all_env\\Lib\\site-packages', // Ensure correct site-packages path
            'PATH' => getenv('PATH'), // Keep existing PATH variable
        ];
    
        // Log the environment variables and command for debugging
        Log::info("Running Python command: {$pythonPath} {$pythonScript} {$topic}");
        Log::info("Environment: HOME={$env['HOME']}, PYTHONPATH={$env['PYTHONPATH']}, PATH=" . getenv('PATH'));
    
        // Create the process and set the environment
        $process = new Process([$pythonPath, $pythonScript, $topic]);
        $process->setEnv($env); // Apply the environment variable fix
    
        // Increase the process timeout to 10 minutes (600 seconds)
        $process->setTimeout(600); // Timeout in seconds
    
        try {
            $process->mustRun(); // Run the process and check for errors
        } catch (ProcessFailedException $exception) {
            // Log the error if the process fails
            Log::error("Python script failed: " . $exception->getMessage());
            return response()->json([
                'error' => 'Failed to generate content.',
                'details' => $exception->getMessage(),
            ], 500);
        }
    
        // Capture the output of the Python script
        $output = $process->getOutput();
        Log::info("Python script output: " . $output);
    
        // Return the response to the frontend
        return response()->json([
            'title' => ucfirst($topic),
            'content' => substr($output, 0, 200), // Shortened content for preview
            'big_content' => $output, // Full content
        ]);
    }
    

}
