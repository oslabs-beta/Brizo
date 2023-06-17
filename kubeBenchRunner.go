// package main indicates a standalone, executable program
// this file is used for benchmarking k8s cluter against CIS security standards and logging the output of each test in your command line
package main

// import packages
import (
	"fmt"
	"log"
	"os/exec"
)

// entry point of file
func main() {
	// create and run kube bench command with exec
	command := exec.Command("kube-bench", "run", "--config", "/tests/cis/job.yaml", "--output", "json");

	// capture the output 
	output, err := command.Output()

	// check for error
	if err != nil {
		log.Fatal(err);
	}

	// print output to console
	fmt.Println(string(output))
}