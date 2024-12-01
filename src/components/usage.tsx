import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const BeamXUsageGuide: React.FC = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          BeamX: Usage Guides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Alert variant="default">
            <Info className="h-4 w-4" />
            <AlertTitle>Current Version (v0)</AlertTitle>
            <AlertDescription>
              BeamX v0 currently supports direct prompts to launch memecoins.
            </AlertDescription>
          </Alert>

          <section>
            <h2 className="text-xl font-semibold mb-4">How to Use BeamX</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">
                  1. Direct Memecoin Launches
                </h3>
                <p className="text-muted-foreground mb-3">
                  You can launch a memecoin with various levels of
                  customization:
                </p>

                <div className="bg-muted p-4 rounded-lg mb-3">
                  <h4 className="font-medium mb-2">Basic Launch</h4>
                  <p className="text-muted-foreground mb-2">
                    Simplest way: Just provide a name
                  </p>
                  <code className="bg-background p-2 rounded block text-sm">
                    launch a memecoin with the name Shola
                  </code>
                </div>

                <div className="bg-muted p-4 rounded-lg mb-3">
                  <h4 className="font-medium mb-2">Detailed Launch</h4>
                  <p className="text-muted-foreground mb-2">
                    Specify additional details like name, symbol, and initial
                    supply
                  </p>
                  <code className="bg-background p-2 rounded block text-sm">
                    launch a memecoin named Shola with symbol SHLA and initial
                    supply of 1000000
                  </code>
                </div>

                <p className="text-muted-foreground">
                  When you provide just a name, our AI and validation system
                  will automatically generate appropriate symbol, initial
                  supply, and other necessary parameters.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">
                  2. After Prompt Submission
                </h3>
                <p className="text-muted-foreground mb-3">
                  After submitting your prompt, the AI will process your request
                  and provide a response.
                </p>

                <Alert >
                  <Info className="h-4 w-4" />
                  <AlertTitle>Current Launch Capabilities</AlertTitle>
                  <AlertDescription>
                    Currently, only the Create Memecoin function is fully
                    operational. The Launch on AMMs and Launch on Ekubo
                    features are being debugged and are temporarily unavailable
                    due to SDK issues.
                  </AlertDescription>
                </Alert>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">
                    Proceeding After Creation
                  </h4>
                  <p className="text-muted-foreground">
                    Once the memecoin is created, youll see a `Proceed` button
                    with options:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Create Memecoin (Currently Working)</li>
                    <li>Launch on Other AMMs (Under Debugging)</li>
                    <li>Launch on Ekubo (Under Debugging)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">Upcoming Features</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Conversation-based memecoin generation</li>
                  <li>Full AMM and Ekubo launch support</li>
                  <li>Enhanced customization options</li>
                  <li>Additional blockchain integration</li>
                </ul>
              </div>
            </div>
          </section>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Future Roadmap</AlertTitle>
            <AlertDescription>
              Future versions will introduce more advanced features like
              conversational AI-driven memecoin creation and expanded launch
              capabilities.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default BeamXUsageGuide;
